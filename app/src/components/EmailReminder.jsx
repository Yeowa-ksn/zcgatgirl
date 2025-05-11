// src/components/EmailReminder.jsx
import React, { useEffect, useState } from "react";
import { generateObsessiveQuote } from "../utils/geminiClient";
import { auth, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const EmailReminder = () => {
  const [quote, setQuote] = useState("");
  const [goal, setGoal] = useState("");
  const [emailLink, setEmailLink] = useState("");

  useEffect(() => {
    const fetchGoalAndQuote = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const goalsQuery = query(
        collection(db, "goals"),
        where("userId", "==", user.uid)
      );
      const goalsSnapshot = await getDocs(goalsQuery);
      if (goalsSnapshot.empty) return;

      const goalDoc = goalsSnapshot.docs[0];
      const goalData = goalDoc.data();
      const goalId = goalDoc.id;
      setGoal(goalData.goal);

      // 달성률 계산용 기록 가져오기
      const recordsQuery = query(
        collection(db, "records"),
        where("userId", "==", user.uid),
        where("goalId", "==", goalId)
      );
      const recordsSnapshot = await getDocs(recordsQuery);

      let done = 0;
      let total = 0;

      recordsSnapshot.docs.forEach((doc) => {
        const status = doc.data().status;
        if (status === "done" || status === "not") {
          total++;
          if (status === "done") done++;
        }
      });

      const percentage = total > 0 ? Math.round((done / total) * 100) : 0;

      // Gemini 멘트 생성
      const msg = await generateObsessiveQuote(goalData.goal, percentage);
      setQuote(msg);

      const mailto = `mailto:${user.email}?subject=집착갓걸 리마인더&body=${encodeURIComponent(msg)}`;
      setEmailLink(mailto);
    };

    fetchGoalAndQuote();
  }, []);

  return (
    <div className="email-reminder">
      <h3>✉️ 집착갓걸의 이메일 메시지</h3>
      <div className="email-preview-box">
        <div className="avatar">{"(｀皿´＃)"}</div>
        <p className="quote-text">“{quote || "너 이 목표 안 지키면 나 진짜 실망이야..."}”</p>
      </div>
      {emailLink && (
        <a href={emailLink}>
          <button>이 메세지를 이메일로 보내기</button>
        </a>
      )}
    </div>
  );
};

export default EmailReminder;