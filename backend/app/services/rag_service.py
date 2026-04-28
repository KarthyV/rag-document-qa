from dotenv import load_dotenv
import os
from groq import Groq
from app.services.embedding_service import search_similar_chunks

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def answer_query(query: str) -> dict:
    try:
        search_results = search_similar_chunks(query)
        if not search_results:
            return {"answer": "No relevant information found.", "sources": []}
        
        context_chunks = [result['metadata'] for result in search_results]

        sources = set(chunk['source'] for chunk in context_chunks)

        text = "\n".join(chunk['text'] for chunk in context_chunks)

        prompt = f'''
         You are a helpful assistant. Answer the question based only on the context below.
         
         Context:
         {text}
         
         Question: {query}
         
         Answer:
        '''

        chat_client = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.7
        )

        return {
            "answer": chat_client.choices[0].message.content,
            "sources": list(sources)
        }
    except Exception as e:
        return {
            "answer": f"Error processing query: {str(e)}",
            "sources": []
        }
