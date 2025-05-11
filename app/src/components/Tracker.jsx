// src/components/Tracker.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const Tracker = ({ goalId }) => {
  const [status, setStatus] = useState(null);
  const user = auth.currentUser;

  const today = new Date().toISOString().split("T")[0];

  const checkExistingRecord = async () => {
    const q = query(
      collection(db, "records"),
      where("userId", "==", user.uid),
      where("goalId", "==", goalId),
      where("date", "==", today)
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      setStatus(data.status); // "done" 또는 "not"
    }
  };

  const handleRecord = async (type) => {
    try {
      await addDoc(collection(db, "records"), {
        userId: user.uid,
        goalId,
        date: today,
        status: type,
        timestamp: serverTimestamp(),
      });
      setStatus(type);
      alert(`오늘 "${type === "done" ? "했다" : "안 했다"}"로 기록했어요.`);
    } catch (error) {
      console.error("기록 오류:", error);
      alert("기록 중 오류 발생");
    }
  };

  useEffect(() => {
    if (user && goalId) {
      checkExistingRecord();
    }
  }, [user, goalId]);

  return (
    <div className="tracker-container">
      <p>오늘 목표를 달성했나요?</p>
      {status ? (
        <p>오늘은 "{status === "done" ? "했다" : "안 했다"}"로 기록됨</p>
      ) : (
        <div className="button-group">
          <button onClick={() => handleRecord("done")}>했다</button>
          <button onClick={() => handleRecord("not")}>안 했다</button>
        </div>
      )}
    </div>
  );
};

export default Tracker;