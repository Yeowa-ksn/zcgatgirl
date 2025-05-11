// src/components/GoalForm.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

const GoalForm = ({ onGoalAdded }) => {
  const [goal, setGoal] = useState("");
  const [reason, setReason] = useState("");
  const [goalCount, setGoalCount] = useState(0);

  useEffect(() => {
    const fetchGoalCount = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "goals"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      setGoalCount(snapshot.size);
    };

    fetchGoalCount();
  }, [onGoalAdded]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user || !goal || !reason) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (goalCount >= 3) {
      alert("목표는 최대 3개까지만 등록할 수 있어요!");
      return;
    }

    try {
      await addDoc(collection(db, "goals"), {
        userId: user.uid,
        goal,
        reason,
        createdAt: serverTimestamp(),
      });
      alert("목표가 저장되었습니다!");
      setGoal("");
      setReason("");
      onGoalAdded(); // 상태 갱신
    } catch (error) {
      console.error("목표 저장 오류:", error);
      alert("오류 발생");
    }
  };

  return (
    <div className="goal-form-container">
      <h2>새 목표 등록</h2>
      {goalCount >= 3 ? (
        <p style={{ color: "gray" }}>※ 목표는 최대 3개까지만 등록할 수 있습니다.</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="목표"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          /><br />
          <input
            type="text"
            placeholder="이유"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          /><br />
          <button onClick={handleSave}>목표 저장</button>
        </>
      )}
    </div>
  );
};

export default GoalForm;