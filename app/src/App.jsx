import React, { useEffect, useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import GoalForm from "./components/GoalForm";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase 로그인 상태 실시간 체크
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // 언마운트 시 해제
  }, []);

  return (
    <div className="App">
      <h1 className="title">집착갓걸</h1>
      {user ? <GoalForm /> : <AuthForm />}
    </div>
  );
}

export default App;