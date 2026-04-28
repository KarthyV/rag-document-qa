from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.rag_service import answer_query

router = APIRouter()

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    answer: str
    sources: list[str]    

@router.post("/")
async def search_query(request: ChatRequest) -> ChatResponse:
  try:
    response = answer_query(request.query)
    return ChatResponse(answer=response["answer"], sources=response["sources"])
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Query failed: {str(e)}")