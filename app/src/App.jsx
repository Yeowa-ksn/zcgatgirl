// src/App.jsx
import React, { useEffect, useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import GoalForm from "./components/GoalForm";
import Tracker from "./components/Tracker";
import Heatmap from "./components/Heatmap";
import WeeklySummary from "./components/WeeklySummary";
import MotivationQuote from "./components/MotivationQuote";
import EmailReminder from "./components/EmailReminder";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [goalId, setGoalId] = useState(null);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1 className="title">집착갓걸</h1>
      {user ? (
        <>
          <GoalForm setGoalId={setGoalId} setStartDate={setStartDate} />
          {goalId && startDate && (
            <>
              <Tracker goalId={goalId} startDate={startDate} />
              <Heatmap goalId={goalId} startDate={startDate} />
              <WeeklySummary goalId={goalId} />
            </>
          )}
          <MotivationQuote />
          <EmailReminder />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default App;