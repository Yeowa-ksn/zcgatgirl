// src/components/GeminiTest.jsx
import React, { useState } from "react";
import { generateObsessiveQuote } from "../utils/geminiClient";

const GeminiTest = () => {
  const [quote, setQuote] = useState("");
  const [goal, setGoal] = useState("");

  const handleGenerate = async () => {
    if (!goal) return alert("목표를 입력해줘!");
    const result = await generateObsessiveQuote(goal);
    setQuote(result);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>집착갓걸 명언 테스트</h3>
      <input
        type="text"
        value={goal}
        placeholder="목표 입력 (예: 다이어트)"
        onChange={(e) => setGoal(e.target.value)}
        style={{ padding: "6px", width: "60%" }}
      />
      <br />
      <button onClick={handleGenerate} style={{ marginTop: "10px" }}>
        명언 생성
      </button>
      {quote && (
        <p style={{ marginTop: "20px", fontStyle: "italic", color: "#e55b73" }}>
          “{quote}”
        </p>
      )}
    </div>
  );
};

export default GeminiTest;