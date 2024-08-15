import { SetStateAction } from "react";
import { Dispatch } from "react";
import { useNavigate } from "react-router-dom";

type NavigationType = "Feed" | "Users" | "Profile";
interface HeaderProps {
  active: NavigationType;
  setActive: Dispatch<SetStateAction<NavigationType>>;
}
const navigationOptions = ["Feed", "Users", "Profile"];
function Header({ active, setActive }: HeaderProps) {
  const navigate = useNavigate();
  const navigationHandler = (e: any) => {
    setActive(e.target.innerHTML);
  };
  const logoutHandler = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="flex w-[80vw] ml-20 mt-4 text-xl gap-4 justify-between">
      <p className="text-2xl text-red-500">Tweetx</p>
      <div className="flex gap-8 ">
        {navigationOptions.map((e) => {
          return (
            <button
              key={e}
              onClick={navigationHandler}
              className={`${active === e && "text-red-500"}`}
            >
              {e}
            </button>
          );
        })}
        <button onClick={logoutHandler} className="flex justify-end">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
