# RAG Document Q&A Application

A full-stack Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and ask questions about their content using AI.

## 🚀 Features

- **PDF Upload**: Upload PDF documents to create a knowledge base
- **Intelligent Q&A**: Ask questions and get AI-powered answers based on your documents
- **Vector Search**: Uses embeddings and Pinecone for semantic search
- **Real-time Processing**: Automatic text extraction and chunking

## 🏗️ Tech Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **Groq**: LLM for generating answers (llama-3.3-70b-versatile)
- **Sentence Transformers**: Local embeddings (all-roberta-large-v1)
- **Pinecone**: Vector database for semantic search
- **PyPDF2**: PDF text extraction

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **React Hooks**: Modern state management

## 📋 Prerequisites

- Python 3.10+
- Node.js 18+
- Pinecone account
- Groq API key

## 🔧 Setup

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file in `backend/`:
```env
GROQ_API_KEY=your_groq_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=rag-app
```

Run the backend:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file in `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the frontend:
```bash
npm run dev
```

## 🌐 Deployment

### Backend (Railway/Render)
1. Create a new project
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Import GitHub repository
2. Framework: Next.js
3. Root directory: `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy

## 📝 API Endpoints

- `POST /api/upload/` - Upload PDF file
- `POST /api/query/query` - Ask a question
- `GET /health` - Health check

## 🐛 Debugging

The application is configured for debugging with VS Code:
- Set breakpoints in Python code
- Press F5 to start debugging
- Use the Python Debug Console terminal

## 📄 License

MIT

## 👤 Author

Your Name
