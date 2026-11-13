import re
import logging
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass

from src.config import get_partition_name, MAX_SUB_QUERIES
from src.chat_history import ChatHistoryManager

logger = logging.getLogger(__name__)

@dataclass
class SubQuery:
    query_text: str
    target_company: Optional[str]
    target_partition: Optional[str]

@dataclass
class QueryConstructionResult:
    original_query: str
    rephrased_query: str
    sub_queries: List[SubQuery]
    target_companies: List[str]
    target_partitions: List[str]
    is_multi_company: bool

class QueryConstructor:
    KNOWN_COMPANIES = {
        "apple": ["apple", "aapl", "iphone", "ipad", "mac", "tim cook", "services division", "app store"],
        "microsoft": ["microsoft", "msft", "azure", "intelligent cloud", "copilot", "satya nadella", "windows", "office 365"],
        "nvidia": ["nvidia", "nvda", "blackwell", "hopper", "h100", "b200", "jensen huang", "data center platform", "cuda", "nim", "geforce"],
        "tesla": ["tesla", "tsla", "elon musk", "cybertruck", "megapack", "energy storage", "full self-driving", "fsd", "robotaxi"],
        "google": ["google", "alphabet", "googl", "goog", "sundar pichai", "google cloud", "gemini", "youtube", "waymo"],
        "amazon": ["amazon", "amzn", "andy jassy", "aws", "amazon web services", "prime"]
    }

    def __init__(self, chat_manager: Optional[ChatHistoryManager] = None):
        self.chat_manager = chat_manager or ChatHistoryManager()

    def identify_companies(self, text: str) -> List[str]:
        text_lower = text.lower()
        found = []
        for company, keywords in self.KNOWN_COMPANIES.items():
            for kw in keywords:
                if re.search(r"\b" + re.escape(kw) + r"\b", text_lower):
                    if company.title() not in found:
                        found.append(company.title())
                    break
        return found

    def construct(
        self,
        user_query: str,
        session_id: Optional[str] = None,
        explicit_company: Optional[str] = None
    ) -> QueryConstructionResult:
        history_context = ""
        last_turn_companies = []
        if session_id:
            history_context = self.chat_manager.get_formatted_context(session_id, max_turns=4)
            history = self.chat_manager.get_history(session_id, limit=4)
            for h in reversed(history):
                c_targets = h.get("company_targets")
                if c_targets:
                    last_turn_companies = c_targets
                    break

        direct_companies = self.identify_companies(user_query)
        if explicit_company and explicit_company.lower() != "all":
            if explicit_company not in direct_companies:
                direct_companies.append(explicit_company)

        rephrased = self._rephrase_with_context(
            user_query=user_query,
            history_context=history_context,
            direct_companies=direct_companies,
            fallback_companies=last_turn_companies
        )

        final_companies = self.identify_companies(rephrased)
        if not final_companies and direct_companies:
            final_companies = direct_companies
        elif not final_companies and last_turn_companies:
            final_companies = last_turn_companies

        sub_queries = self._decompose_into_subqueries(rephrased, final_companies)
        target_partitions = [get_partition_name(c) for c in final_companies]
        is_multi = len(final_companies) > 1

        return QueryConstructionResult(
            original_query=user_query,
            rephrased_query=rephrased,
            sub_queries=sub_queries,
            target_companies=final_companies,
            target_partitions=target_partitions,
            is_multi_company=is_multi
        )

    def _rephrase_with_context(
        self,
        user_query: str,
        history_context: str,
        direct_companies: List[str],
        fallback_companies: List[str]
    ) -> str:
        query_lower = user_query.lower().strip()
        pronoun_triggers = ["their", "its", "they", "them", "this company", "that company", "the company", "the firm"]
        elision_triggers = ["what about", "how about", "and for", "compare that to", "compare with", "what is it for"]

        has_pronoun = any(re.search(r"\b" + re.escape(p) + r"\b", query_lower) for p in pronoun_triggers)
        has_elision = any(query_lower.startswith(e) for e in elision_triggers)

        prior_company = fallback_companies[0] if fallback_companies else (direct_companies[0] if direct_companies else None)

        if has_pronoun and prior_company:
            rephrased = user_query
            for p in ["their", "its", "the company's"]:
                pattern = re.compile(r"\b" + p + r"\b", re.IGNORECASE)
                rephrased = pattern.sub(f"{prior_company}'s", rephrased)

            for p in ["they", "it", "this company", "the company", "the firm"]:
                pattern = re.compile(r"\b" + p + r"\b", re.IGNORECASE)
                rephrased = pattern.sub(prior_company, rephrased)

            return rephrased

        elif (has_elision or not direct_companies) and prior_company:
            rephrased = user_query
            if prior_company.lower() not in rephrased.lower():
                rephrased = f"{prior_company}: {rephrased}"
            return rephrased

        return user_query

    def _decompose_into_subqueries(
        self,
        query: str,
        target_companies: List[str]
    ) -> List[SubQuery]:
        sub_queries: List[SubQuery] = []

        if len(target_companies) > 1:
            for comp in target_companies:
                sub_text = f"{comp} performance and metrics regarding: {query}"
                sub_queries.append(SubQuery(
                    query_text=sub_text,
                    target_company=comp,
                    target_partition=get_partition_name(comp)
                ))
            return sub_queries[:MAX_SUB_QUERIES]

        comp = target_companies[0] if target_companies else None
        part = get_partition_name(comp) if comp else None

        compound_splitters = [r"\bas well as\b", r"\balong with\b", r"\b\s*;\s*\b", r"\bin addition to\b"]
        parts = []
        for splitter in compound_splitters:
            if re.search(splitter, query, re.IGNORECASE):
                parts = re.split(splitter, query, flags=re.IGNORECASE)
                break

        if len(parts) > 1:
            for p in parts:
                p_clean = p.strip()
                if p_clean:
                    if comp and comp.lower() not in p_clean.lower():
                        p_clean = f"{comp} {p_clean}"
                    sub_queries.append(SubQuery(
                        query_text=p_clean,
                        target_company=comp,
                        target_partition=part
                    ))
            return sub_queries[:MAX_SUB_QUERIES]

        sub_queries.append(SubQuery(
            query_text=query,
            target_company=comp,
            target_partition=part
        ))
        return sub_queries
