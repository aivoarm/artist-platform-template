"use client";
import { useState } from "react";

export function ExperimentsClient({ dict }: { dict: any }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    if (!input.trim()) return;
    setLoading(true);
    
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResponse(data.text);
    } catch (error) {
      setResponse("Error connecting to the lab.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <textarea 
        className="w-full p-4 border rounded-xl bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
        rows={5}
        placeholder={dict?.placeholder || "Ask something..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex justify-end">
        <button 
          onClick={askGemini}
          disabled={loading || !input}
          className="px-8 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black font-bold rounded-xl hover:opacity-80 transition-all disabled:opacity-50"
        >
          {loading ? (dict?.loading || "Processing...") : (dict?.button || "Run Experiment")}
        </button>
      </div>

      {response && (
        <div className="mt-12 p-6 bg-neutral-100 dark:bg-neutral-900/50 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 leading-relaxed shadow-sm">
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}