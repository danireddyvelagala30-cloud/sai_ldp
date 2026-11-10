import csv
import string
import numpy as np

with open("lyrics.csv", newline="", encoding="utf-8") as f:
    rows = list(csv.reader(f))

header = rows[0]
data = np.array(rows[1:], dtype=object)

print("Columns:", header)
print("Shape:", data.shape)

LYRICS_COL = 0

lyrics = data[:, LYRICS_COL]
print("Total lyrics:", len(lyrics))

remove_punct = str.maketrans("", "", string.punctuation)

def clean_lyric(text):
    return text.lower().translate(remove_punct)

clean_all = np.vectorize(clean_lyric, otypes=[object])
clean_lyrics = clean_all(lyrics)

print("Before:", lyrics[0][:100])
print("After: ", clean_lyrics[0][:100])

rng = np.random.default_rng()  
sample_size = min(10, len(clean_lyrics))  
sample_indexes = rng.choice(len(clean_lyrics), size=sample_size, replace=False)
sample = clean_lyrics[sample_indexes]

print("\nRandom sample of", sample_size, "lyrics:")
for i, lyric in enumerate(sample, start=1):
    print(i, "-", lyric[:80])
