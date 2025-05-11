import React from "react";

const quotes = [
  "작심삼일도 계속하면 365일이다.",
  "오늘 하지 않으면, 내일도 못한다.",
  "노력은 배신하지 않는다. 꾸준함이 실력이다.",
  "성공은 포기하지 않는 사람의 것이다.",
  "작은 변화가 큰 결과를 만든다.",
  "해야 한다면, 지금 해라.",
  "지금 이 순간이 가장 빠른 시간이다.",
];

const MotivationQuote = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="motivation-quote">
      <p>{randomQuote}</p>
    </div>
  );
};

export default MotivationQuote;