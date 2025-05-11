// src/components/GoalFeed.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import StatusImage from "./StatusImage";
import Heatmap from "./Heatmap";
import MotivationQuote from "./MotivationQuote";

const GoalFeed = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "goals"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(fetched);
    };

    fetchGoals();
  }, []);

  return (
    <div className="goal-feed">
      <h2>📋 너의 목표 피드</h2>
      {goals.map((goal) => (
        <div key={goal.id} className="goal-card">
          <h3>🎯 {goal.goal}</h3>
          <p>이유: {goal.reason}</p>
          <p>시작일: {goal.startDate?.toDate?.().toLocaleDateString() || "N/A"}</p>
          <StatusImage goalId={goal.id} />
          <MotivationQuote />
          <Heatmap goalId={goal.id} />
        </div>
      ))}
    </div>
  );
};

export default GoalFeed;