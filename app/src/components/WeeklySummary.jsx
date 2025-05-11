// src/components/WeeklySummary.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { startOfWeek, endOfWeek, format } from "date-fns";

const WeeklySummary = ({ goalId }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const user = auth.currentUser;
      if (!user || !goalId) return;

      const today = new Date();
      const start = startOfWeek(today, { weekStartsOn: 1 }); // 월요일 시작
      const end = endOfWeek(today, { weekStartsOn: 1 });

      const q = query(
        collection(db, "records"),
        where("userId", "==", user.uid),
        where("goalId", "==", goalId),
        where("timestamp", ">=", Timestamp.fromDate(start)),
        where("timestamp", "<=", Timestamp.fromDate(end))
      );

      const snapshot = await getDocs(q);
      const total = snapshot.size;
      const doneCount = snapshot.docs.filter(doc => doc.data().status === "done").length;
      const rate = total ? Math.round((doneCount / total) * 100) : 0;

      setSummary({ doneCount, total, rate });
    };

    fetchSummary();
  }, [goalId]);

  if (!summary) return null;

  return (
    <div className="weekly-summary">
      <h3>📈 이번 주 성취 요약</h3>
      <p>총 {summary.total}일 중 {summary.doneCount}일 달성</p>
      <p>달성률: {summary.rate}%</p>
    </div>
  );
};

export default WeeklySummary;