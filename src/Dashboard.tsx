import { useState } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Users from "./components/Users";
import Profile from "./components/Profile";

type NavigationType = "Feed" | "Users" | "Profile";
function Dashboard() {
  const [activeState, setActiveState] = useState<NavigationType>("Feed");

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="shadow-md pb-4 w-full">
        <Header setActive={setActiveState} active={activeState} />
      </div>
      {activeState === "Feed" && <Feed />}
      {activeState === "Users" && <Users />}
      {activeState === "Profile" && <Profile />}
    </div>
  );
}

export default Dashboard;
