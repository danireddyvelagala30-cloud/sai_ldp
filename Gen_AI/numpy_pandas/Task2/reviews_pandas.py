import string
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD

df = pd.read_csv("customer_reviews.csv")

print("Columns:", list(df.columns))
print("Shape:", df.shape)

TEXT_COL = "Review"
LABEL_COL = "Sentiment"

df = df.dropna(subset=[TEXT_COL, LABEL_COL]).copy()
df[LABEL_COL] = df[LABEL_COL].astype(str).str.lower().str.strip()

df = df[df[LABEL_COL].isin(["positive", "negative"])].copy()

print("\nLabel counts:")
print(df[LABEL_COL].value_counts())

remove_punct = str.maketrans("", "", string.punctuation)

def clean_text(text):
    return str(text).lower().translate(remove_punct)

df["clean_review"] = df[TEXT_COL].apply(clean_text)

print("\nBefore:", df[TEXT_COL].iloc[0][:100])
print("After: ", df["clean_review"].iloc[0][:100])

df["word_count"] = df["clean_review"].str.split().str.len()

avg_word_count = df.groupby(LABEL_COL)["word_count"].mean()
print("\nAverage word count:")
print(avg_word_count)

plt.figure(figsize=(8, 5))
for label in df[LABEL_COL].unique():
    subset = df[df[LABEL_COL] == label]
    plt.hist(subset["word_count"], bins=10, alpha=0.6, label=label)

plt.title("Word count distribution by sentiment")
plt.xlabel("Word count")
plt.ylabel("Number of reviews")
plt.legend()
plt.show()

vectorizer = TfidfVectorizer(stop_words="english")
tfidf = vectorizer.fit_transform(df["clean_review"])

svd = TruncatedSVD(n_components=2, random_state=42)
points = svd.fit_transform(tfidf)

df["x"] = points[:, 0]
df["y"] = points[:, 1]

plt.figure(figsize=(8, 6))
colors = {"positive": "green", "negative": "red"}
for label in df[LABEL_COL].unique():
    subset = df[df[LABEL_COL] == label]
    plt.scatter(subset["x"], subset["y"], alpha=0.5, label=label,
                color=colors.get(label, "gray"))

one_positive = df[df[LABEL_COL] == "positive"].iloc[0]
plt.scatter(one_positive["x"], one_positive["y"], s=300, marker="*",
            color="blue", label="chosen positive review")

print("\nChosen positive review:", one_positive[TEXT_COL][:150])

plt.title("Reviews in 2D (TF-IDF + SVD)")
plt.xlabel("Component 1")
plt.ylabel("Component 2")
plt.legend()
plt.show()
