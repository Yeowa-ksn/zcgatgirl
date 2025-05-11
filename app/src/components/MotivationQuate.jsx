// src/components/MotivationQuote.jsx
import React, { useEffect, useState } from "react";

const quotes = [
  "오늘도 넌, 해낼 수 있어.",
  "작은 성취도 꾸준히 쌓이면 위대해져.",
  "게으른 천재보다 집착하는 갓걸이 낫다.",
  "지금 포기하면 어제의 내가 아쉬워해.",
  "네가 그리는 내일은 오늘 만들 수 있어.",
  "그만두지 마. 이미 멀리 왔어.",
  "기억해, 넌 스스로를 증명할 수 있어.",
];

const MotivationQuote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  }, []);

  return (
    <div className="motivation-quote">
      <p>{quote}</p>
    </div>
  );
};

export default MotivationQuote;