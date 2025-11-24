
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const runGemini = async () => {
    setLoading(true);
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a professional prompt engineer AI. Create the strongest professional prompt based on this idea: ${idea}`;

    const response = await model.generateContent(prompt);
    setResult(response.response.text());
    setLoading(false);
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Gemini Prompt Engineer 🔥</h1>
      <textarea
        placeholder="Enter your idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        style={{ width: "100%", height: 80 }}
      />
      <button onClick={runGemini} style={{ marginTop: 10 }}>
        {loading ? "Generating..." : "Generate Prompt"}
      </button>
      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{result}</pre>
    </div>
  );
}
