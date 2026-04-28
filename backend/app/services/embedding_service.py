from dotenv import load_dotenv
from pinecone import Pinecone
import os
from langchain_openai import OpenAIEmbeddings
from sentence_transformers import SentenceTransformer

load_dotenv()

def get_pinecone_index():
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    return pc.Index(os.getenv("PINECONE_INDEX_NAME"))

def get_embedding_model():
    return SentenceTransformer('all-MiniLM-L6-v2')

def embed_and_store(chunks:list[str], filename:str): 
    embeddings = get_embedding_model()
    index = get_pinecone_index()

    for i, chunk in enumerate(chunks):
        vector_values = embeddings.encode(chunk).tolist()
        index.upsert([
            { 
                "id": f"{filename}_chunk_{i}",
                "values": vector_values,
                "metadata": {"text": chunk, "source": filename}
            }
        ])

def search_similar_chunks(query:str, top_k:int=5) -> list[dict]:
    embeddings = get_embedding_model()
    index = get_pinecone_index()
    query_vector = embeddings.encode(query).tolist()
    semantic_search = index.query(vector=query_vector, top_k=top_k, include_metadata=True)
    return semantic_search['matches']