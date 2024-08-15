import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { registerUser, loginUser } from "../api.ts";
import { useNavigate } from "react-router-dom";
type Mode = "Login" | "Register";
interface FormProps {
  type: Mode;
  setType: Dispatch<SetStateAction<Mode>>;
}
function isValidEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
function Form({ type, setType }: FormProps) {
  // const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const [inputForm, setInputForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("setting token");
      // setToken(storedToken);
      navigate("/dashboard"); // Redirect to the dashboard
    }
  }, []);

  const formChangeHandler = (e: any) => {
    setInputForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "email") {
      setEmailError(!isValidEmail(e.target.value));
    }
  };
  const RegisterAndLoginHandler = async () => {
    if (
      type === "Register" &&
      !emailError &&
      inputForm.password === inputForm.confirmPassword
    ) {
      try {
        const response = await registerUser({
          name: inputForm.name,
          email: inputForm.email,
          password: inputForm.password,
        });
        console.log(response);
        setInputForm((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
          name: "",
        }));
        setType("Login");
      } catch (error) {
        console.log(error);
      }
    } else if (type === "Login" && !emailError) {
      console.log("trying to login", inputForm);
      try {
        const response = await loginUser({
          email: inputForm.email,
          password: inputForm.password,
        });
        // const { token } = response;
        const { token, user } = response;
        console.log(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        // setToken(token);
        navigate("/dashboard"); // Redirect to the dashboard
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("INSIDE ELES");
    }
  };
  return (
    <div>
      <p className="text-4xl font-medium text-gray-500">
        {type === "Login" ? "Login" : "Create Account"}
      </p>
      <div className="flex flex-col mt-20 gap-8">
        {type === "Register" && (
          <input
            placeholder="Name"
            onChange={formChangeHandler}
            value={inputForm.name}
            name="name"
            className="max-w-96 pl-4 text-gray-600 py-3 bg-[#f7f7f7] rounded-lg"
          ></input>
        )}
        <input
          placeholder="Email"
          name="email"
          onChange={formChangeHandler}
          value={inputForm.email}
          className={`max-w-96 min-w-80 pl-4 text-gray-600 py-3 bg-[#f7f7f7] rounded-lg  ${
            emailError ? " border-red-500 border" : "border-none"
          }`}
        ></input>
        <input
          placeholder="Password"
          name="password"
          value={inputForm.password}
          onChange={formChangeHandler}
          className="max-w-96 pl-4 text-gray-600 py-3 bg-[#f7f7f7] rounded-lg"
        ></input>
        {type === "Register" && (
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={inputForm.confirmPassword}
            onChange={formChangeHandler}
            className="max-w-96 pl-4 text-gray-600 py-3 bg-[#f7f7f7] rounded-lg"
          ></input>
        )}
        <div className="flex gap-12 max-w-96 justify-between">
          <button className="text-gray-500 font-semibold">
            {type === "Login" ? "Forgot Password ? " : ""}
          </button>
          <button
            onClick={RegisterAndLoginHandler}
            className="bg-red-400 px-6 py-2 text-white font-semibold rounded-lg"
          >
            {type === "Login" ? "Login " : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
