import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [idea, setIdea] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await model.generateContent(`Pitch an idea for: ${idea}`);
      const text = result.response.text();
      setOutput(text);
    } catch (err) {
      console.error("❌ Gemini API error:", err);
      alert("Error: check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        placeholder="Write your idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      {output && <pre className={styles.output}>{output}</pre>}
    </div>
  );
}
