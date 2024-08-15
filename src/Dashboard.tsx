import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Users from "./components/Users";
import Profile from "./components/Profile";
// interface User {
//   name: string;
//   email: string;
// }
type NavigationType = "Feed" | "Users" | "Profile";
function Dashboard() {
  // const [token, setToken] = useState<string | null>(null);
  // const [user, setUser] = useState<User | null>(null);
  const [activeState, setActiveState] = useState<NavigationType>("Feed");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // localStorage.removeItem("token");
    if (storedToken) {
      console.log("setting token");
      // setToken(storedToken);
      const storedUserInfo = localStorage.getItem("user");
      console.log(storedUserInfo);
      // setUser(JSON.parse(storedUserInfo));
    }
  }, []);

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
