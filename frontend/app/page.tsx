"use client";

import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import QueryInterface from "@/components/QueryInterface";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  useEffect(() => {
    console.log("🏠 HOME PAGE LOADED!");
    console.log("If you see this, the page is working");
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            RAG Document Q&A
          </h1>
          <p className="text-gray-600">
            Upload a PDF and ask questions about its content
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Step 1: Upload PDF</h2>
            <FileUpload onUploadSuccess={setUploadedFile} />
            {uploadedFile && (
              <p className="mt-4 text-sm text-green-600">
                ✅ Uploaded: {uploadedFile}
              </p>
            )}
          </div>

          {/* Right: Query */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Step 2: Ask Questions
            </h2>
            <QueryInterface />
          </div>
        </div>
      </div>
    </main>
  );
}
