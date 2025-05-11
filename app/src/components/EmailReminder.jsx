// src/components/EmailReminder.jsx
import React, { useState } from "react";
import { auth } from "../firebase/config";

const EmailReminder = () => {
  const [sent, setSent] = useState(false);

  const sendEmail = async () => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 실제 이메일 전송이 아닌 시뮬레이션
    console.log(`이메일 전송 대상: ${user.email}`);
    alert(`동기부여 이메일이 ${user.email}로 전송되었습니다!`);
    setSent(true);
  };

  return (
    <div className="email-reminder">
      <h3>메일 알림</h3>
      <p>하루 목표를 깜빡하지 않도록 이메일로 리마인드!</p>
      <button onClick={sendEmail} disabled={sent}>
        {sent ? "이미 전송됨!" : "메일 보내기"}
      </button>
    </div>
  );
};

export default EmailReminder;