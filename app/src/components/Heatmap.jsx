// src/components/Heatmap.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { subDays, format } from "date-fns";

const Heatmap = ({ goalId }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchRecords = async () => {
      const user = auth.currentUser;
      if (!user || !goalId) return;

      const q = query(
        collection(db, "records"),
        where("userId", "==", user.uid),
        where("goalId", "==", goalId)
      );
      const snapshot = await getDocs(q);

      const result = {};
      snapshot.docs.forEach((doc) => {
        const record = doc.data();
        result[record.date] = record.status;
      });

      setData(result);
    };

    fetchRecords();
  }, [goalId]);

  // 최근 30일 날짜 만들기
  const today = new Date();
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(today, i);
    const key = format(date, "yyyy-MM-dd");
    return {
      date: key,
      status: data[key] || "none",
    };
  }).reverse();

  return (
    <div className="heatmap">
      <h3>최근 30일 히트맵</h3>
      <div className="heatmap-grid">
        {last30.map(({ date, status }) => (
          <div
            key={date}
            className={`heatmap-cell ${status}`}
            title={`${date} - ${status}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;