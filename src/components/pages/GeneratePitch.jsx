// components/pages/GeneratePitch/GeneratePitch.jsx
import React, { useState } from "react";
import styles from "./GeneratePitch.module.css";

export default function GeneratePitch({ generateFunction }) {
  const [idea, setIdea] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    try {
      const result = await generateFunction(idea);
      if (result.error) {
        setOutput(`Error: ${result.error}`);
      } else {
        setOutput(result.pitch || result.text || JSON.stringify(result));
      }
    } catch (err) {
      setOutput(`Error: ${err.message}`);
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
