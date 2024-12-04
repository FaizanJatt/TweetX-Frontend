import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { registerUser, loginUser } from "../api.ts";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

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
  const [passwordView, setPasswordView] = useState<boolean>(false);
  const togglePasswordView = () => {
    setPasswordView((prev) => !prev);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
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
        if (response) {
          setInputForm((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
            name: "",
          }));
          setType("Login");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (type === "Login" && !emailError) {
      try {
        const response = await loginUser({
          email: inputForm.email,
          password: inputForm.password,
        });

        const { token, user } = response;
        console.log(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard"); // Redirect to the dashboard
      } catch (error) {
        console.log(error);
      }
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
        <div className="relative">
          <input
            placeholder="Password"
            name="password"
            value={inputForm.password}
            type={passwordView ? "text" : "password"}
            onChange={formChangeHandler}
            className="w-full pl-4 pr-12 text-gray-600 py-3 bg-[#f7f7f7] rounded-lg"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon
              onClick={togglePasswordView}
              icon={faEye}
              opacity={0.4}
              size="1x"
            />
          </div>
        </div>

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
