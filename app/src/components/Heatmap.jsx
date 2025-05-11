// src/components/Heatmap.jsx
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { subDays, format } from "date-fns";
import "../App.css";

const Heatmap = ({ goalId, startDate }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [completionRate, setCompletionRate] = useState(0);
  const [characterImage, setCharacterImage] = useState("stage1.png");

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user || !goalId || !startDate) return;

      const endDate = new Date();
      const start = new Date(startDate.toDate());
      const recordRef = collection(db, "records");

      const q = query(
        recordRef,
        where("userId", "==", user.uid),
        where("goalId", "==", goalId)
      );
      const snapshot = await getDocs(q);

      const result = [];
      for (let d = new Date(start); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = format(new Date(d), "yyyy-MM-dd");
        result.push({ date: dateStr, count: 0 });
      }

      let doneCount = 0;
      snapshot.forEach((doc) => {
        const { date, status } = doc.data();
        const index = result.findIndex((item) => item.date === date);
        if (index !== -1) {
          result[index].count = status === "done" ? 1 : 2;
          if (status === "done") doneCount++;
        }
      });

      setHeatmapData(result);

      const rate = Math.round((doneCount / result.length) * 100);
      setCompletionRate(rate);

      if (rate >= 80) setCharacterImage("stage5.png");
      else if (rate >= 60) setCharacterImage("stage4.png");
      else if (rate >= 40) setCharacterImage("stage3.png");
      else if (rate >= 20) setCharacterImage("stage2.png");
      else setCharacterImage("stage1.png");
    };

    fetchData();
  }, [goalId, startDate]);

  const today = new Date();

  return (
    <div className="heatmap-container">
      <h3>🔥 목표 달성 히트맵</h3>
      <img
        src={`/assets/${characterImage}`}
        alt="캐릭터 이미지"
        className="character-image"
      />
      <p>현재 달성률: {completionRate}%</p>
      <CalendarHeatmap
        startDate={subDays(today, 30)}
        endDate={today}
        values={heatmapData}
        classForValue={(value) => {
          if (!value || !value.count) return "color-empty";
          return value.count === 1 ? "color-done" : "color-fail";
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default Heatmap;