"use client";

import { useState } from "react";
import { queryRAG, QueryResponse } from "@/lib/api";

export default function QueryInterface() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<QueryResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a question");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await queryRAG(query);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Query failed");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about the uploaded document..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Searching..." : "Ask Question"}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {response && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Answer:</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{response.answer}</p>
          </div>

          {response.sources && response.sources.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Sources:</h3>
              <ul className="list-disc list-inside space-y-1">
                {response.sources.map((source, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
