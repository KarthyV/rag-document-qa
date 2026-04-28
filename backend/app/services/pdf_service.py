from PyPDF2 import PdfReader
from langchain_text_splitters.character import RecursiveCharacterTextSplitter

def extract_text_from_pdf(file_path:str) -> str:
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def split_text_into_chunks(text:str) -> list[str]:
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = text_splitter.split_text(text)
    return chunks