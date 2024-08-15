import { useState } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Users from "./components/Users";
import Profile from "./components/Profile";

type NavigationType = "Feed" | "Users" | "Profile";
function Dashboard() {
  const [activeState, setActiveState] = useState<NavigationType>("Feed");

  return (
    <>
      <div className="shadow-md pb-4">
        <Header setActive={setActiveState} active={activeState} />
      </div>
      {activeState === "Feed" && <Feed />}
      {activeState === "Users" && <Users />}
      {activeState === "Profile" && <Profile />}
    </>
  );
}

export default Dashboard;
