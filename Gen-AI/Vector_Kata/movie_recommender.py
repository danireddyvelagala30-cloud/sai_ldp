import os
import pandas as pd
import chromadb
from chromadb.utils import embedding_functions

def get_sample_data():
    return pd.DataFrame([
        {
            "title": "Inception",
            "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            "genre": "Sci-Fi",
            "director": "Christopher Nolan"
        },
        {
            "title": "Interstellar",
            "description": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.",
            "genre": "Sci-Fi",
            "director": "Christopher Nolan"
        },
        {
            "title": "The Dark Knight",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genre": "Action",
            "director": "Christopher Nolan"
        },
        {
            "title": "Pulp Fiction",
            "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            "genre": "Crime",
            "director": "Quentin Tarantino"
        },
        {
            "title": "Django Unchained",
            "description": "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
            "genre": "Western",
            "director": "Quentin Tarantino"
        },
        {
            "title": "The Matrix",
            "description": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
            "genre": "Sci-Fi",
            "director": "Lana Wachowski"
        },
        {
            "title": "Avatar",
            "description": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
            "genre": "Sci-Fi",
            "director": "James Cameron"
        },
        {
            "title": "Titanic",
            "description": "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
            "genre": "Romance",
            "director": "James Cameron"
        },
        {
            "title": "Jurassic Park",
            "description": "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
            "genre": "Adventure",
            "director": "Steven Spielberg"
        },
        {
            "title": "Schindler's List",
            "description": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
            "genre": "Drama",
            "director": "Steven Spielberg"
        }
    ])

def load_data(filepath="movies.csv"):
    if os.path.exists(filepath):
        df = pd.read_csv(filepath)
        col_map = {col.lower().strip(): col for col in df.columns}
        
        desc_col = col_map.get("description") or col_map.get("overview") or col_map.get("plot")
        genre_col = col_map.get("genre") or col_map.get("genres")
        director_col = col_map.get("director") or col_map.get("directors")
        title_col = col_map.get("title") or col_map.get("movie_title") or col_map.get("name")
        
        standardized_data = []
        for _, row in df.iterrows():
            desc = str(row[desc_col]) if desc_col and pd.notna(row[desc_col]) else ""
            genre = str(row[genre_col]) if genre_col and pd.notna(row[genre_col]) else "Unknown"
            director = str(row[director_col]) if director_col and pd.notna(row[director_col]) else "Unknown"
            title = str(row[title_col]) if title_col and pd.notna(row[title_col]) else "Untitled"
            
            if desc.strip():
                standardized_data.append({
                    "title": title,
                    "description": desc,
                    "genre": genre,
                    "director": director
                })
        return pd.DataFrame(standardized_data)
    else:
        return get_sample_data()

def build_vector_store(df, collection_name="movie_recommendations"):
    client = chromadb.Client()
    
    try:
        client.delete_collection(name=collection_name)
    except Exception:
        pass
        
    embedding_fn = embedding_functions.DefaultEmbeddingFunction()
    collection = client.create_collection(
        name=collection_name,
        embedding_function=embedding_fn,
        metadata={"hnsw:space": "cosine"}
    )
    
    descriptions = df["description"].tolist()
    embeddings = embedding_fn(descriptions)
    
    metadatas = [
        {
            "title": str(row["title"]),
            "genre": str(row["genre"]),
            "director": str(row["director"])
        }
        for _, row in df.iterrows()
    ]
    
    ids = [str(i) for i in range(len(df))]
    
    collection.add(
        ids=ids,
        documents=descriptions,
        embeddings=embeddings,
        metadatas=metadatas
    )
    
    return collection, embedding_fn

def build_filter(genre=None, director=None):
    filters = []
    if genre:
        filters.append({"genre": {"$eq": genre}})
    if director:
        filters.append({"director": {"$eq": director}})
    
    if len(filters) == 0:
        return None
    elif len(filters) == 1:
        return filters[0]
    else:
        return {"$and": filters}

def recommend_movies(collection, query_text, genre=None, director=None, n_results=5):
    filter_expr = build_filter(genre=genre, director=director)
    
    query_kwargs = {
        "query_texts": [query_text],
        "n_results": n_results
    }
    if filter_expr:
        query_kwargs["where"] = filter_expr
        
    results = collection.query(**query_kwargs)
    return results

def display_recommendations(results):
    ids = results["ids"][0]
    docs = results["documents"][0]
    metas = results["metadatas"][0]
    distances = results.get("distances", [[]])[0]
    
    print("\n" + "=" * 70)
    print("TOP MOVIE RECOMMENDATIONS")
    print("=" * 70)
    
    for rank, (doc_id, doc, meta) in enumerate(zip(ids, docs, metas), start=1):
        score_info = f" (Cosine Distance: {distances[rank - 1]:.4f})" if distances else ""
        print(f"\n{rank}. {meta.get('title', 'Unknown')}{score_info}")
        print(f"   Director: {meta.get('director', 'Unknown')}")
        print(f"   Genre: {meta.get('genre', 'Unknown')}")
        print(f"   Description: {doc}")
    print("\n" + "=" * 70)

if __name__ == "__main__":
    df = load_data("movies.csv")
    print(f"Loaded {len(df)} movies.")
    
    collection, embedding_fn = build_vector_store(df)
    print("Movie descriptions and embeddings successfully inserted into ChromaDB.")
    
    user_query = "futuristic space exploration and saving humanity"
    print(f"\n[Query]: '{user_query}' | No Filter")
    res1 = recommend_movies(collection, user_query, n_results=5)
    display_recommendations(res1)
    
    user_query_2 = "mind bending psychological reality"
    target_director = "Christopher Nolan"
    print(f"\n[Query]: '{user_query_2}' | Filter: Director='{target_director}'")
    res2 = recommend_movies(collection, user_query_2, director=target_director, n_results=5)
    display_recommendations(res2)
    
    user_query_3 = "deep space mission"
    target_genre = "Sci-Fi"
    print(f"\n[Query]: '{user_query_3}' | Filter: Genre='{target_genre}' AND Director='{target_director}'")
    res3 = recommend_movies(collection, user_query_3, genre=target_genre, director=target_director, n_results=5)
    display_recommendations(res3)
