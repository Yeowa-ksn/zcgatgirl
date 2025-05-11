// src/components/EmailReminder.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const EmailReminder = () => {
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      setEmail(user.email);

      const goalsRef = collection(db, "goals");
      const q = query(goalsRef, where("userId", "==", user.uid));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const goalData = snapshot.docs[0].data();
        setGoal(goalData.goal);
      }
    };

    fetchUserData();
  }, []);

  const handleSendReminder = () => {
    // 실제 메일 전송 로직은 Firebase Functions 또는 외부 API 필요
    alert(`(예시) ${email}에게 "${goal}" 목표 알림 메일을 보냅니다.`);
  };

  return (
    <div className="email-reminder">
      <h3>📧 목표 리마인더 메일</h3>
      <p>이메일: {email}</p>
      <p>목표: {goal}</p>
      <button onClick={handleSendReminder}>메일 알림 보내기</button>
    </div>
  );
};

export default EmailReminder;