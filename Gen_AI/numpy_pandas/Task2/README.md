# Problem 2: Customer Review Sentiment Analysis using Pandas & Matplotlib

## Scenario
You are building a RAG-based system to analyze customer reviews and classify them as positive or negative. The dataset is stored in `customer_reviews.csv`, along with sentiment labels.

---

## Tasks Completed

1. **Load Data**: Loaded `customer_reviews.csv` into a Pandas DataFrame and filtered for `positive` and `negative` sentiment labels.
2. **Text Preprocessing**: Converted review texts to lowercase and removed all punctuation marks using Python's `string.punctuation`.
3. **Average Word Count**: Computed average word counts grouped by sentiment label:
   - **Negative Reviews**: ~16.12 words
   - **Positive Reviews**: ~16.00 words
4. **Distribution Visualization**: Visualized word count distributions across sentiments using histograms in Matplotlib (`word_count_distribution.png`).
5. **Cluster & Positive Review Observation**: Projected review texts into 2D space using **TF-IDF Vectorization** and **TruncatedSVD (2 components)**. Plotted review clusters and highlighted a selected positive review (`sentiment_clusters.png`), observing that it falls closely within the positive sentiment cluster.

---

## Files in this Directory

- [`customer_reviews.csv`](customer_reviews.csv) - The dataset containing reviews and sentiment labels.
- [`reviews_pandas.py`](reviews_pandas.py) - Complete Python solution implementing all 5 steps.
- [`word_count_distribution.png`](word_count_distribution.png) - Saved histogram plot of word count distributions.
- [`sentiment_clusters.png`](sentiment_clusters.png) - Saved 2D scatter plot showing sentiment clusters and the highlighted positive review.
- [`requirements.txt`](requirements.txt) - Python package dependencies.

---

## How to Run

```bash
# Using the virtual environment
.venv\Scripts\python.exe reviews_pandas.py
```
