# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)

### Steps

1. **Go to Vercel**: https://vercel.com/new
2. **Import Git Repository**: 
   - Click "Import Git Repository"
   - Select `KarthyV/rag-document-qa`
   - Authorize GitHub access if needed

3. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Environment Variables**:
   Add this in the Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=<Your Backend URL from Render>
   ```
   (You'll update this after deploying the backend)

5. **Deploy**: Click "Deploy"

---

## Backend Deployment (Render)

### Prerequisites
- GitHub account
- Render account (sign up at https://render.com)

### Steps

1. **Go to Render**: https://dashboard.render.com/
2. **New Web Service**: 
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `KarthyV/rag-document-qa`

3. **Configure Service**:
   - **Name**: `rag-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. **Environment Variables**:
   Add these in Render dashboard:
   ```
   GROQ_API_KEY=<your-groq-key>
   PINECONE_API_KEY=<your-pinecone-key>
   PINECONE_INDEX_NAME=rag-app
   OPENAI_API_KEY=<your-openai-key-or-leave-empty>
   PYTHON_VERSION=3.13
   ```

5. **Instance Type**: Free (for testing)

6. **Deploy**: Click "Create Web Service"

---

## Post-Deployment

### Update Frontend Environment Variable

1. Go back to Vercel dashboard
2. Go to your project → Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` to your Render backend URL
   - Format: `https://rag-backend.onrender.com` (replace with your actual URL)
4. Redeploy the frontend (Deployments → Latest → Redeploy)

### Enable CORS

The backend is already configured to allow all origins in development. For production, you may want to restrict this to your Vercel domain.

---

## Accessing Your App

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://rag-backend.onrender.com`
- **API Docs**: `https://rag-backend.onrender.com/docs`

---

## Notes

- **Free tier limitations**:
  - Render free tier sleeps after 15 min of inactivity (first request takes ~30s to wake up)
  - Vercel has bandwidth and build time limits on free tier
  
- **Environment Variables**: Never commit API keys to git. Always use environment variables.

- **Model Storage**: The first request will download the sentence-transformers model (~500MB). This happens once and is cached.
