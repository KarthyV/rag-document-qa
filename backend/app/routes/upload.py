from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdf_service import extract_text_from_pdf, split_text_into_chunks
from app.services.embedding_service import embed_and_store
import os
import tempfile

router = APIRouter()

@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    try:

        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
            raw_text = extract_text_from_pdf(temp_file_path)
            chunks = split_text_into_chunks(raw_text)

            embed_and_store(chunks, file.filename)

            os.remove(temp_file_path)

        return {
            "message": "PDF uploaded and processed successfully",
            "filename": file.filename,
            "chunks_created": len(chunks)
        }
    
    except Exception as e:
        if 'temp_file_path' in locals():
            os.remove(temp_file_path)
        raise HTTPException(status_code=500, detail=str(e))
