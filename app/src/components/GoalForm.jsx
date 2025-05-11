import React, { useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Tracker from "./Tracker";

const GoalForm = () => {
  const [goal, setGoal] = useState("");
  const [reason, setReason] = useState("");
  const [goalId, setGoalId] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!goal || !reason) {
      alert("목표와 이유를 모두 입력해 주세요.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "goals"), {
        userId: user.uid,
        goal,
        reason,
        startDate: serverTimestamp(),
      });

      alert("🎯 목표가 저장되었습니다!");

      setGoalId(docRef.id);
      setStartDate(new Date().toISOString().split("T")[0]); // 현재 날짜를 시작일로
      setGoal("");
      setReason("");
    } catch (error) {
      console.error("저장 오류:", error);
      alert("목표 저장 중 오류 발생");
    }
  };

  return (
    <div className="goal-form-container">
      <h2>🎯 너의 목표를 적어줘</h2>
      <input
        type="text"
        placeholder="목표"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      /><br /><br />
      <input
        type="text"
        placeholder="이유"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      /><br /><br />
      <button onClick={handleSave}>목표 저장</button>

      {/* 🎯 목표 저장 후에만 Tracker 연결 */}
      {goalId && startDate && (
        <Tracker goalId={goalId} startDate={startDate} />
      )}
    </div>
  );
};

export default GoalForm;