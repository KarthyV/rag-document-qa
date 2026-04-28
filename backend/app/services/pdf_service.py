from PyPDF2 import PdfReader
from langchain_text_splitters.character import RecursiveCharacterTextSplitter

def extract_text_from_pdf(file_path:str) -> str:
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        raise Exception(f"Failed to extract text from PDF: {str(e)}")

def split_text_into_chunks(text:str) -> list[str]:
    try:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = text_splitter.split_text(text)
        return chunks
    except Exception as e:
        raise Exception(f"Failed to split text into chunks: {str(e)}")