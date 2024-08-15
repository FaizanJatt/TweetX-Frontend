import "./App.css";
import Form from "./components/Form";
import { useState } from "react";

// interface Mode {

// }
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
      <div className="w-screen h-screen ">
        <div className="ml-14 mt-8">
          <div>
            <div className="  text-red-500 font-medium text-2xl">
              <p>Tweetx</p>
            </div>
            <button
              onClick={modeToggleHandler}
              className="mt-6 px-6 py-1 w-48 border-gray-300 text-gray-800 font-semibold border-s border-2 rounded-lg"
            >
              <p>{mode === "Login" ? "Create Account" : "Login"}</p>
            </button>
          </div>
          <div className="mt-20">
            <Form setType={setMode} type={mode} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
