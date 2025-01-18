import React, { useState, FormEvent, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("ShopContext must be used within a ShopProvider");
  }
  const { token, setToken, navigate, backendUrl } = context;

  const [currentState, setCurrentState] = useState<"Login" | "Sign Up">(
    "Login"
  );
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-white shadow-md rounded-md p-8 max-w-md mx-auto mt-16 text-gray-800"
    >
      <div className="flex flex-col items-center mb-6">
        <p className="text-3xl font-semibold">
          {currentState === "Login" ? "Welcome Back" : "Create Account"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {currentState === "Login"
            ? "Sign in to access your account"
            : "Join us and start shopping"}
        </p>
        <hr className="border-t mt-4 w-20" />
      </div>

      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mb-4">
        <p className="text-blue-500 hover:underline cursor-pointer">
          Forgot your password?
        </p>
        <p
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
          }
          className="text-blue-500 hover:underline cursor-pointer"
        >
          {currentState === "Login" ? "Create Account" : "Login Here"}
        </p>
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
