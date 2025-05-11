import React, { useEffect, useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import Tracker from "./components/Tracker";
import Heatmap from "./components/Heatmap";
import StatusImage from "./components/StatusImage";
import MotivationQuote from "./components/MotivationQuote";
import EmailReminder from "./components/EmailReminder";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoalAdded = () => {
    setRefresh((prev) => !prev);
  };

  const handleGoalSelected = (goalId) => {
    setSelectedGoalId(goalId);
  };

  return (
    <div className="App">
      <h1 className="title">집착갓걸</h1>
      {user ? (
        <>
          <GoalForm onGoalAdded={handleGoalAdded} />
          <GoalList onSelectGoal={handleGoalSelected} />
          {selectedGoalId && (
            <>
              <StatusImage goalId={selectedGoalId} />
              <MotivationQuote />
              <EmailReminder />
              <Tracker goalId={selectedGoalId} />
              <Heatmap goalId={selectedGoalId} />
            </>
          )}
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default App;