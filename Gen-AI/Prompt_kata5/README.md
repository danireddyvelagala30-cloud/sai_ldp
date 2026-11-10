# Prompt Kata 5: Problem 1 — Context-Aware Text-to-SQL System

## Overview
This repository contains the complete design, prompt engineering specifications, and Python pipeline for **Problem 1**: transforming generic natural language questions into context-specific questions and generating accurate SQL queries using a two-stage LLM workflow.

---

## Deliverables in this Workspace

1. **[pipeline.py](file:///c:/Users/srini/Desktop/Python_GenAI/Prompt_kata5/pipeline.py)**
   - Clean, concise Python implementation of the two-stage prompt engineering pipeline.
   - Demonstrates Stage 1 (Question Refinement into JSON) and Stage 2 (Schema-Grounded SQL Generation).

---

## How to Run the Pipeline

Run the pipeline from the command line:

```bash
python pipeline.py
```

It will execute the pipeline, validating Stage 1 JSON refinement and printing the formatted Stage 2 PostgreSQL query.
