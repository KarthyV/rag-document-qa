"use client";

import { useState, useEffect } from "react";
import { uploadPDF, UploadResponse } from "@/lib/api";

interface FileUploadProps {
  onUploadSuccess: (filename: string) => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<UploadResponse | null>(null);

  useEffect(() => {
    console.log("🚀 FileUpload component mounted!");
  }, []);

  useEffect(() => {
    console.log("📦 File state changed:", file);
    console.log("📝 FileName state changed:", fileName);
  }, [file, fileName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("=== FILE CHANGE EVENT ===");
    console.log("Event target:", e.target);
    console.log("Files:", e.target.files);
    
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e?.target?.files[0];
      console.log("Selected file:", {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size
      });
      
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(null);
      setSuccess(null);
      
      console.log("State should be updated now");
    } else {
      console.log("No file in files array");
    }
  };

  const handleUpload = async () => {
    console.log("=== UPLOAD CLICKED ===");
    console.log("Current file:", file);
    console.log("File name:", fileName);
    
    if (!file) {
      const msg = "Please select a file first";
      console.log("Error:", msg);
      setError(msg);
      return;
    }

    if (!file.name.endsWith(".pdf")) {
      const msg = "Only PDF files are allowed";
      console.log("Error:", msg);
      setError(msg);
      return;
    }

    try {
      console.log("Starting upload...");
      setUploading(true);
      setError(null);
      const response = await uploadPDF(file);
      console.log("Upload response:", response);
      setSuccess(response);
      onUploadSuccess(response.filename);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Upload failed";
      console.error("Upload error:", errorMsg, err);
      setError(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
          onClick={() => console.log("👆 Label clicked!")}
        >
          <svg
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="text-sm text-gray-600">
            {fileName || "Click to select a PDF file"}
          </span>
          {fileName && (
            <span className="text-xs text-green-600 mt-1">
              ✓ File ready: {fileName}
            </span>
          )}
        </label>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          <p className="font-semibold">{success.message}</p>
          <p className="text-sm">Chunks created: {success.chunks_created}</p>
        </div>
      )}
    </div>
  );
}
