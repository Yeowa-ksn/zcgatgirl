// src/components/StatusImage.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const StatusImage = ({ goalId }) => {
  const [percentage, setPercentage] = useState(null);

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

      let done = 0;
      let total = 0;

      snapshot.docs.forEach((doc) => {
        const record = doc.data();
        if (record.status === "done" || record.status === "not") {
          total++;
          if (record.status === "done") done++;
        }
      });

      const ratio = total > 0 ? Math.round((done / total) * 100) : null;
      setPercentage(ratio);
    };

    fetchRecords();
  }, [goalId]);

  const getImageForRate = () => {
    if (percentage === null) return "/src/assets/level3_soso.png"; // 신규 사용자
    if (percentage >= 80) return "/src/assets/level1_happy.png";
    if (percentage >= 55) return "/src/assets/level2_good.png";
    if (percentage >= 40) return "/src/assets/level3_soso.png";
    if (percentage >= 20) return "/src/assets/level4_bad.png";
    return "/src/assets/level5_melt.png";
  };

  return (
    <div className="status-image">
      <p>현재 달성률: {percentage !== null ? `${percentage}%` : "기록 없음"}</p>
      <img src={getImageForRate()} alt="달성 상태 이미지" width="150" />
    </div>
  );
};

export default StatusImage;