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
    <div className="flex w-full  mt-4 text-xl gap-4 justify-between">
      <p className="text-[14px] md:text-[14px] lg:text-2xl lg:ml-20  text-red-400 font-semibold">
        Tweetx
      </p>
      <div className="flex gap-8 ">
        {navigationOptions.map((e) => {
          return (
            <button
              key={e}
              onClick={navigationHandler}
              className={`text-[12px] lg:text-lg font-semibold ${
                active === e && "text-red-400"
              } ${active !== e && "text-gray-400"}`}
            >
              {e}
            </button>
          );
        })}
        <button
          onClick={logoutHandler}
          className="flex justify-center items-center  font-semibold text-gray-400 mr-5 text-[12px] lg:text-lg "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
