// src/components/Heatmap.jsx
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { db, auth } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Heatmap = ({ goalId, startDate }) => {
  const [data, setData] = useState([]);
  const [endDate] = useState(new Date()); // 오늘 날짜

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user || !goalId) return;

      const q = query(
        collection(db, "records"),
        where("userId", "==", user.uid),
        where("goalId", "==", goalId)
      );

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => doc.data());

      // heatmap용 데이터 가공
      const mapped = docs.map(record => ({
        date: record.date,
        count: record.status === "done" ? 1 : 0
      }));

      setData(mapped);
    };

    fetchData();
  }, [goalId]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📅 목표 달성 히트맵</h3>
      <CalendarHeatmap
        startDate={new Date(startDate)}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count === 1) return "color-filled";
          return "color-empty";
        }}
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default Heatmap;
