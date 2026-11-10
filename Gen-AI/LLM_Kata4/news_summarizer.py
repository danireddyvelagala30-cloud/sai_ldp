"""Summarize news articles and answer questions using saved summaries."""

from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import asdict, dataclass
from datetime import date
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import trafilatura
from openai import OpenAI, OpenAIError

DEFAULT_MODEL = "gpt-4o-mini"
MAX_ARTICLE_CHARS = 30_000
ARTICLE_TYPES = (
    "business",
    "entertainment",
    "financial",
    "health",
    "politics",
    "science",
    "sports",
    "technology",
    "world",
    "other",
)


@dataclass(frozen=True)
class ArticleSummary:
    date: str
    summary: str
    articleType: str


class SummarizerError(Exception):
    """An expected, user-facing application error."""


def extract_article(url: str) -> tuple[str, str | None]:
    """Fetch an article and return its extracted text and publication date."""
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise SummarizerError(f"Invalid article URL: {url}")

    downloaded = trafilatura.fetch_url(url)
    if not downloaded:
        raise SummarizerError(f"Could not download article: {url}")

    text = trafilatura.extract(
        downloaded,
        include_comments=False,
        include_tables=False,
        output_format="txt",
    )
    if not text or not text.strip():
        raise SummarizerError(f"No article text could be extracted from: {url}")

    metadata = trafilatura.extract_metadata(downloaded, default_url=url)
    published = metadata.date if metadata else None
    return text.strip()[:MAX_ARTICLE_CHARS], published


def normalize_date(value: str) -> str:
    """Validate an input date and store it in ISO 8601 date format."""
    try:
        return date.fromisoformat(value).isoformat()
    except ValueError as exc:
        raise SummarizerError(
            f"Invalid date {value!r}; use YYYY-MM-DD."
        ) from exc


def make_summary(
    client: OpenAI, text: str, model: str = DEFAULT_MODEL
) -> tuple[str, str]:
    """Generate a concise summary and a controlled article category."""
    categories = ", ".join(ARTICLE_TYPES)
    response = client.chat.completions.create(
        model=model,
        temperature=0.2,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": (
                    "You summarize news articles accurately and concisely. "
                    "Use only information in the article. Return a JSON object "
                    'with exactly two string fields: "summary" (2-4 sentences) '
                    f'"articleType" (one of: {categories}).'
                ),
            },
            {"role": "user", "content": text},
        ],
    )
    content = response.choices[0].message.content
    if not content:
        raise SummarizerError("The LLM returned an empty summary.")

    try:
        result: Any = json.loads(content)
    except json.JSONDecodeError as exc:
        raise SummarizerError("The LLM returned invalid JSON.") from exc

    if not isinstance(result, dict):
        raise SummarizerError("The LLM response must be a JSON object.")
    summary = result.get("summary")
    article_type = result.get("articleType")
    if not isinstance(summary, str) or not summary.strip():
        raise SummarizerError("The LLM response has no valid summary.")
    if not isinstance(article_type, str) or article_type not in ARTICLE_TYPES:
        raise SummarizerError(
            "The LLM response has an invalid articleType."
        )
    return summary.strip(), article_type


def load_records(path: Path) -> list[ArticleSummary]:
    """Load and validate the summaries JSON file."""
    if not path.exists():
        return []
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise SummarizerError(f"Could not read valid JSON from {path}: {exc}") from exc

    if not isinstance(data, list):
        raise SummarizerError(f"{path} must contain a JSON array.")

    records: list[ArticleSummary] = []
    for index, item in enumerate(data):
        if not isinstance(item, dict):
            raise SummarizerError(f"Entry {index + 1} in {path} is not an object.")
        article_date = item.get("date")
        summary = item.get("summary")
        article_type = item.get("articleType")
        if not all(isinstance(value, str) and value.strip() for value in (
            article_date,
            summary,
            article_type,
        )):
            raise SummarizerError(
                f"Entry {index + 1} in {path} needs non-empty date, summary, "
                "and articleType strings."
            )
        records.append(
            ArticleSummary(
                date=article_date,
                summary=summary,
                articleType=article_type,
            )
        )
    return records


def save_records(path: Path, records: list[ArticleSummary]) -> None:
    """Persist summaries as a JSON array with the assignment's exact keys."""
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(
            json.dumps([asdict(record) for record in records], indent=2) + "\n",
            encoding="utf-8",
        )
    except OSError as exc:
        raise SummarizerError(f"Could not write summaries to {path}: {exc}") from exc


def answer_question(
    client: OpenAI,
    records: list[ArticleSummary],
    question: str,
    model: str = DEFAULT_MODEL,
) -> str:
    """Answer only from archived summaries, avoiding unsupported guesses."""
    if not records:
        raise SummarizerError("No summaries are available. Summarize articles first.")
    response = client.chat.completions.create(
        model=model,
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": (
                    "Answer the user's question using only the provided news "
                    "summaries. If the summaries do not contain the answer, "
                    "say that the saved summaries do not provide enough "
                    "information. Do not add outside facts."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Saved summaries:\n"
                    f"{json.dumps([asdict(record) for record in records], ensure_ascii=False)}"
                    f"\n\nQuestion: {question}"
                ),
            },
        ],
    )
    content = response.choices[0].message.content
    if not content or not content.strip():
        raise SummarizerError("The LLM returned an empty answer.")
    return content.strip()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Summarize news article URLs and ask questions about saved summaries."
    )
    parser.add_argument(
        "--data-file",
        type=Path,
        default=Path("summaries.json"),
        help="JSON file used to store and read summaries (default: summaries.json).",
    )
    parser.add_argument(
        "--model",
        default=os.getenv("OPENAI_MODEL", DEFAULT_MODEL),
        help=f"OpenAI chat model (default: {DEFAULT_MODEL}, or OPENAI_MODEL).",
    )
    commands = parser.add_subparsers(dest="command", required=True)

    summarize_parser = commands.add_parser(
        "summarize", help="Extract and summarize one or more article URLs."
    )
    summarize_parser.add_argument("urls", nargs="+", help="News article URL(s).")
    summarize_parser.add_argument(
        "--date",
        help="Publication date override (YYYY-MM-DD), only for one article.",
    )

    ask_parser = commands.add_parser(
        "ask", help="Ask a question based on summaries already saved."
    )
    ask_parser.add_argument("question", help="Question about the saved news summaries.")
    return parser


def run(args: argparse.Namespace) -> int:
    if not os.getenv("OPENAI_API_KEY"):
        raise SummarizerError("Set the OPENAI_API_KEY environment variable first.")
    if args.command == "summarize" and args.date and len(args.urls) != 1:
        raise SummarizerError("--date can only be used with one article URL.")

    client = OpenAI()
    records = load_records(args.data_file)
    if args.command == "summarize":
        new_records: list[ArticleSummary] = []
        for url in args.urls:
            text, extracted_date = extract_article(url)
            article_date = args.date or extracted_date
            if not article_date:
                raise SummarizerError(
                    f"No publication date found for {url}; provide --date YYYY-MM-DD."
                )
            normalized = normalize_date(article_date[:10])
            summary, article_type = make_summary(client, text, args.model)
            new_records.append(
                ArticleSummary(
                    date=normalized,
                    summary=summary,
                    articleType=article_type,
                )
            )
        records.extend(new_records)
        save_records(args.data_file, records)
        print(f"Saved {len(new_records)} summary(s) to {args.data_file}.")
        return 0

    print(answer_question(client, records, args.question, args.model))
    return 0


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        return run(args)
    except SummarizerError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    except OpenAIError as exc:
        print(f"OpenAI API error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
