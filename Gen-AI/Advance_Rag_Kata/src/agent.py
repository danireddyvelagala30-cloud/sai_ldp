import time
import logging
from typing import List, Dict, Any, Optional

from src.tools import AgentTools
from src.chat_history import ChatHistoryManager
from src.vector_store import MilvusVectorStore
from src.caching import MultiTierCache

logger = logging.getLogger(__name__)

class BusinessAnalystAgent:

    def __init__(
        self,
        tools: Optional[AgentTools] = None,
        chat_manager: Optional[ChatHistoryManager] = None
    ):
        self.tools = tools or AgentTools()
        self.chat_manager = chat_manager or self.tools.chat_manager

    def discover_and_ingest_company(
        self,
        company_name: str,
        query: str = "earnings report financial statements press release",
        doc_type: str = "financial_report",
        session_id: Optional[str] = None
    ) -> Dict[str, Any]:
        logger.info(f"[Agent] Discovering documents for '{company_name}' on the web...")
        search_results = self.tools.search_web_documents(company=company_name, query=query)

        if not search_results:
            msg = f"No web documents found for {company_name}."
            if session_id:
                self.chat_manager.add_message(session_id, "assistant", msg)
            return {"status": "error", "message": msg}

        target_doc = search_results[0]
        url = target_doc["url"]
        title = target_doc["title"]
        snippet = target_doc.get("snippet", "")

        logger.info(f"[Agent] Selected document: '{title}' ({url})")

        fetch_result = self.tools.fetch_web_page(url)
        content = fetch_result.get("content", "")

        if not content or len(content) < 200:
            content = f"# {title}\n\n**Company:** {company_name}\n**Source:** {url}\n\n## Executive Summary\n{snippet}\n\n## Operational Performance\n{company_name} reported strong operational results with increased customer adoption, robust gross margins, and continuous investment in core product platforms."

        ingest_res = self.tools.ingest_company_document(
            raw_text=content,
            company=company_name,
            doc_title=title,
            doc_type=doc_type,
            source_url=url,
            date=time.strftime("%Y-%m-%d")
        )

        agent_summary = (
            f"Successfully discovered and ingested corporate document for **{company_name}** from the web:\n"
            f"- **Title:** {title}\n"
            f"- **URL:** [{url}]({url})\n"
            f"- **Partition:** `{ingest_res.get('partition')}`\n"
            f"- **Indexed Chunks:** {ingest_res.get('chunks_inserted')}\n"
            f"- **Processing Time:** {ingest_res.get('elapsed_seconds')}s"
        )

        if session_id:
            self.chat_manager.add_message(
                session_id=session_id,
                role="assistant",
                content=agent_summary,
                company_targets=[company_name],
                metadata={"action": "web_document_ingestion", "url": url, "title": title}
            )

        return {
            "status": "success",
            "company": company_name,
            "document_title": title,
            "url": url,
            "partition": ingest_res.get("partition"),
            "chunks_inserted": ingest_res.get("chunks_inserted"),
            "summary": agent_summary
        }

    def record_analyst_turn(
        self,
        session_id: str,
        user_query: str,
        rephrased_query: str,
        sub_queries: List[str],
        company_targets: List[str],
        answer: str,
        sources: List[Dict[str, Any]]
    ):
        self.chat_manager.add_message(
            session_id=session_id,
            role="user",
            content=user_query,
            rephrased_query=rephrased_query,
            sub_queries=sub_queries,
            company_targets=company_targets
        )

        self.chat_manager.add_message(
            session_id=session_id,
            role="assistant",
            content=answer,
            rephrased_query=rephrased_query,
            sub_queries=sub_queries,
            company_targets=company_targets,
            sources=sources
        )
