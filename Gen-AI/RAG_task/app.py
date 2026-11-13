import streamlit as st
import pandas as pd
from src.rag_engine import RAGEngine
from src.milvus_store import MilvusVectorStore
from src.document_loader import DocumentLoader
from src.ingest import run_ingestion
from src.config import MILVUS_COLLECTION_NAME, EMBEDDING_DIM

st.set_page_config(
    page_title="NVIDIA Business Analysis RAG System",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

st.markdown("""
<style>
    .main-header {
        font-size: 2.2rem;
        font-weight: 700;
        color: #10b981;
        margin-bottom: 0.2rem;
    }
    .sub-header {
        font-size: 1.05rem;
        color: #94a3b8;
        margin-bottom: 1.5rem;
    }
    .metric-card {
        background: #1e293b;
        border-radius: 8px;
        padding: 16px;
        border-left: 4px solid #10b981;
    }
    .source-box {
        background: #0f172a;
        padding: 12px;
        border-radius: 6px;
        margin-top: 8px;
        border: 1px solid #334155;
    }
</style>
""", unsafe_allow_html=True)

@st.cache_resource
def get_rag_engine():
    return RAGEngine()

def main():
    rag = get_rag_engine()

    with st.sidebar:
        st.image("https://img.icons8.com/color/96/nvidia.png", width=64)
        st.title("Business Analysis System")
        st.markdown("**Enterprise Document QA & Grounded Intelligence**")
        st.divider()

        st.subheader("⚙️ Retrieval Parameters")
        doc_filter = st.selectbox(
            "Document Category Filter:",
            options=["all", "financial_report", "blog_post", "press_release"],
            format_func=lambda x: {
                "all": "All Documents",
                "financial_report": "Financial Reports (10-K/Q4)",
                "blog_post": "Technical Blog Posts",
                "press_release": "Official Press Releases"
            }[x]
        )

        top_k = st.slider("Top Chunks (k):", min_value=3, max_value=8, value=5)

        st.divider()
        st.subheader("💾 Milvus Vector Store")
        
        try:
            store = MilvusVectorStore()
            stats = store.get_stats()
            store.close()
            st.success("Connected to Milvus Lite")
            st.metric("Indexed Chunks", stats.get("row_count", 0))
            st.caption(f"Collection: `{MILVUS_COLLECTION_NAME}`")
            st.caption(f"Dimension: `{EMBEDDING_DIM}` (BGE-small)")
            st.caption("Distance Metric: `COSINE`")
        except Exception as e:
            st.error(f"Milvus Status: {e}")

        if st.button("🔄 Re-Ingest All Documents", use_container_width=True):
            with st.spinner("Processing, chunking, and embedding into Milvus..."):
                ingest_res = run_ingestion(drop_existing=True)
                st.success(f"Ingested {ingest_res['chunk_count']} chunks across {ingest_res['document_count']} documents in {ingest_res['elapsed_time']:.1f}s!")
                st.rerun()

    st.markdown('<div class="main-header">NVIDIA Corporate Intelligence Engine</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">AI-Powered Business Analysis System grounded in official Form 10-K financial reports, technical architecture blogs, and corporate press releases.</div>', unsafe_allow_html=True)

    kpi1, kpi2, kpi3, kpi4 = st.columns(4)
    with kpi1:
        st.metric("FY2025 Total Revenue", "$96.31 Billion", "+122% YoY")
    with kpi2:
        st.metric("Data Center Revenue", "$87.82 Billion", "+142% YoY (91% Share)")
    with kpi3:
        st.metric("GAAP Gross Margin", "75.0%", "+230 bps YoY")
    with kpi4:
        st.metric("Cash & Securities", "$43.20 Billion", "Net Cash $34.74B")

    st.divider()

    st.subheader("🔍 Ask a Business Analyst Question")
    preset_queries = [
        "What was NVIDIA's total revenue and Data Center revenue for FY2025?",
        "What are NVIDIA's four primary market platforms and their revenue figures?",
        "What were NVIDIA's GAAP and non-GAAP gross margins and operating income for fiscal 2025?",
        "What are the core technical innovations of Blackwell architecture over Hopper?",
        "What is NVIDIA NIM, what APIs does it support, and how does it improve inference throughput?",
        "What is Project GR00T and how does NVIDIA use Omniverse and Isaac Sim for humanoid robotics?",
        "Which global automakers and autonomous trucking leaders have adopted NVIDIA DRIVE Thor?",
        "What was Jensen Huang's statement regarding reasoning AI and Blackwell production?"
    ]

    selected_preset = st.selectbox(
        "💡 Quick Preset Question (or type a custom inquiry below):",
        ["-- Select a sample query --"] + preset_queries
    )

    default_query = selected_preset if selected_preset != "-- Select a sample query --" else "What was NVIDIA's total revenue and Data Center revenue for FY2025?"
    query_text = st.text_input("Enter your business query:", value=default_query)

    search_btn = st.button("🚀 Analyze Documents", type="primary", use_container_width=True)

    if query_text and (search_btn or selected_preset != "-- Select a sample query --"):
        with st.spinner("Executing semantic retrieval and executive synthesis..."):
            filter_val = doc_filter if doc_filter != "all" else None
            response = rag.query(
                user_query=query_text,
                top_k=top_k,
                doc_type_filter=filter_val
            )
            rag.vector_store.close()

        st.markdown("### 📋 Executive Analysis")
        st.caption(f"Synthesized by: **{response.provider.upper()}** | Retrieved Chunks: **{response.retrieval_count}**")

        tab_ans, tab_citations, tab_evidence, tab_docs = st.tabs([
            "📑 Executive Brief",
            "🎯 Audited Sources",
            "🔍 Evidence Snippets",
            "📚 Available Document Corpus"
        ])

        with tab_ans:
            st.markdown(response.answer)

        with tab_citations:
            st.markdown("#### Verified Citations & Attribution Map")
            cit_data = []
            for c in response.citations:
                cit_data.append({
                    "Citation": f"[Source {c.index}]",
                    "Similarity Score": f"{c.score:.1%}",
                    "Source Document": c.source_file,
                    "Category": c.doc_type.replace("_", " ").title(),
                    "Section": c.section,
                    "Date": c.date
                })
            df_cit = pd.DataFrame(cit_data)
            st.dataframe(df_cit, use_container_width=True)

        with tab_evidence:
            st.markdown("#### Retrieved Evidence Snippets from Milvus")
            for c in response.citations:
                with st.expander(f"[Source {c.index}] {c.source_file} - {c.section} (Score: {c.score:.3f})", expanded=(c.index == 1)):
                    st.markdown(f"**Document Title:** {c.doc_title} | **Date:** {c.date}")
                    st.text(c.snippet)

        with tab_docs:
            st.markdown("#### Corporate Documents in Knowledge Base")
            loader = DocumentLoader()
            docs = loader.load_all_documents()
            doc_table = []
            for d in docs:
                doc_table.append({
                    "Category": d.doc_type.replace("_", " ").title(),
                    "Document Title": d.title,
                    "File": d.source_file,
                    "Date": d.date,
                    "Length (Chars)": len(d.content)
                })
            st.dataframe(pd.DataFrame(doc_table), use_container_width=True)

if __name__ == "__main__":
    main()
