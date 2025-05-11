import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import Heatmap from "./Heatmap";

const Tracker = ({ goalId, startDate }) => {
  const [status, setStatus] = useState(null);
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const handleRecord = async (didIt) => {
    const user = auth.currentUser;
    if (!user || !goalId) {
      alert("로그인 또는 목표 설정 필요");
      return;
    }

    try {
      const recordRef = collection(db, "records");
      await addDoc(recordRef, {
        userId: user.uid,
        goalId,
        date: today,
        status: didIt ? "done" : "missed",
        timestamp: serverTimestamp(),
      });
      setStatus(didIt ? "done" : "missed");
    } catch (err) {
      console.error("기록 저장 실패:", err);
    }
  };

  // 기존 기록 여부 확인 (중복 방지)
  useEffect(() => {
    const fetchStatus = async () => {
      const user = auth.currentUser;
      if (!user || !goalId) return;
      const q = query(
        collection(db, "records"),
        where("userId", "==", user.uid),
        where("goalId", "==", goalId),
        where("date", "==", today)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const record = snapshot.docs[0].data();
        setStatus(record.status);
      }
    };
    fetchStatus();
  }, [goalId]);

  return (
    <div className="tracker-container">
      <h3>오늘 목표를 달성했어?</h3>
      <button onClick={() => handleRecord(true)} disabled={status !== null}>
        ✅ 했다
      </button>
      <button onClick={() => handleRecord(false)} disabled={status !== null}>
        ❌ 안 했다
      </button>
      {status && <p>오늘은 "{status === "done" ? "했다" : "안 했다"}"로 기록됨</p>}

      {/* ✅ 히트맵 시각화 추가 */}
      {goalId && startDate && (
        <Heatmap goalId={goalId} startDate={startDate} />
      )}
    </div>
  );
};

export default Tracker;