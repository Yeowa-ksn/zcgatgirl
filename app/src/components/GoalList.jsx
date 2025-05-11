import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import StatusImage from "./StatusImage";

const GoalList = ({ onSelectGoal }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "goals"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const goalData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGoals(goalData);
    };

    fetchGoals();
  }, []);

  const handleDelete = async (goalId) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "goals", goalId));
      setGoals(goals.filter(goal => goal.id !== goalId));
    }
  };

  return (
    <div className="goal-list-container">
      <h3>나의 목표들</h3>
      {goals.map((goal) => (
        <div key={goal.id} className="goal-card">
          <strong>{goal.goal} - {goal.reason}</strong>
          <StatusImage goalId={goal.id} />
          <p>오늘 목표를 달성했나요?</p>
          <p>오늘은 "했다/안했다"로 기록됨</p>
          <div className="button-group">
            <button onClick={() => onSelectGoal(goal.id)}>기록</button>
            <button onClick={() => handleDelete(goal.id)}>삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoalList;