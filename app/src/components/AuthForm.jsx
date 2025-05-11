import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
    const auth = getAuth();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("회원가입 완료!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("로그인 성공!");
      }
    } catch (error) {
      alert(`오류 발생: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="title">집착갓걸</h1>
      <div className="form-box">
        <h2>{isSignup ? "회원가입" : "로그인"}</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAuth}>{isSignup ? "회원가입" : "로그인"}</button>
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "로그인으로 전환" : "회원가입으로 전환"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;