import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./Dashboard.module.css";

import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";

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


 const handleDownloadPDF = () => {
    if (!output) {
      alert("Please generate a pitch before downloading.");
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const margin = 10;
      const pageHeight = doc.internal.pageSize.height - margin * 2;
      let y = margin;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("💼 PitchCraft – AI Startup Partner", margin, y);
      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      const lines = doc.splitTextToSize(output, 180);
      lines.forEach((line) => {
        if (y > pageHeight) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 7;
      });

      doc.save("PitchCraft_Pitch.pdf");
    } catch (err) {
      console.error("❌ PDF generation error:", err);
    }
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>💼 PitchCraft – Tumhara AI Startup Partner</h1>

      <textarea
        className={styles.textarea}
        placeholder="Write your idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        disabled={loading}
      />

      <div className={styles.buttonGroup}> 
        <button
          className={styles.button}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className={styles.loader}></span> Generating...
            </>
          ) : (
            "Generate"
          )}
        </button>

        
        <button
          className={`${styles.button} ${styles.pdfButton}`}
          onClick={handleDownloadPDF}
          disabled={!output}
        >
          📄 Download PDF
        </button>

 
         <Logout />

      </div>

{output && (
  <pre id="outputContainer" className={styles.output}>
    {output}
  </pre>
)}
    </div>
  );
}
