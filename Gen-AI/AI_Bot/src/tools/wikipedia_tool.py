from langchain_core.tools import tool
import wikipedia


@tool
def wikipedia_search_tool(query: str) -> str:
    """
    Useful to search Wikipedia for factual encyclopedic knowledge about
    people, places, scientific concepts, history, companies, and definitions.
    Input: Search query string (e.g. 'Artificial Intelligence', 'Alan Turing', 'Quantum Computing').
    """
    clean_query = query.strip().strip("'\"")
    if not clean_query:
        return "Error: Empty search query provided."

    try:
        search_results = wikipedia.search(clean_query, results=3)
        if not search_results:
            return f"No Wikipedia articles found for '{clean_query}'."

        top_title = search_results[0]
        summary = wikipedia.summary(top_title, sentences=3, auto_suggest=False)
        return (
            f"Wikipedia Article: {top_title}\n"
            f"Summary: {summary}\n"
            f"Related Topics: {', '.join(search_results[1:]) if len(search_results) > 1 else 'None'}"
        )
    except wikipedia.DisambiguationError as dis_err:
        options = dis_err.options[:5]
        return (
            f"The query '{clean_query}' is ambiguous and may refer to:\n- "
            + "\n- ".join(options)
            + "\nPlease refine your search with a more specific term."
        )
    except wikipedia.PageError:
        return f"Could not find a Wikipedia page directly matching '{clean_query}'."
    except Exception as exc:
        return f"Wikipedia query error: {str(exc)}"
