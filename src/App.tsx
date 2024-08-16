import "./App.css";
import Form from "./components/Form";
import { useState } from "react";

type Mode = "Login" | "Register";
function App() {
  const [mode, setMode] = useState<Mode>("Login");
  const modeToggleHandler = () => {
    if (mode === "Login") {
      setMode("Register");
    } else {
      setMode("Login");
    }
  };
  return (
    <>
      <div className=" h-screen flex justify-between w-[99%]">
        <div className="ml-14 mt-8">
          <div>
            <div className="  text-red-400 font-semibold text-3xl">
              <p>Tweetx</p>
            </div>
            <button
              onClick={modeToggleHandler}
              className="mt-10 px-6 py-1 w-48  border-gray-300 text-gray-800 font-semibold border-s border-2 rounded-lg"
            >
              <p>{mode === "Login" ? "Create Account" : "Login"}</p>
            </button>
          </div>
          <div className="mt-20">
            <Form setType={setMode} type={mode} />
          </div>
        </div>
        <div className=" w-1/2 h-full justify-center items-center object-contain md:block hidden">
          <img className="object-cover" src="/assets/Logo.jpg" alt="Logo" />
        </div>
      </div>
    </>
  );
}

export default App;
