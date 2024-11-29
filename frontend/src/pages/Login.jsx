import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmitHandler(evt) {
    evt.preventDefault();
    //console.log("Form Data:", { name, email, password }); // Log form data
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          console.log("Registration successful:", response.data);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          console.error("Registration failed:", response.data.message);
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          console.log("Login successful:", response.data);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success('Successfully logged in!')
        } else {
          console.error("Login failed:", response.data.message);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(
        "Error during request:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }


  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <>
          <input
            type="text"
            onChange={(evt) => setName(evt.target.value)}
            value={name}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        </>
      )}

      <input
        type="email"
        onChange={(evt) => setEmail(evt.target.value)}
        value={email}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="password"
        onChange={(evt) => setPassword(evt.target.value)}
        value={password}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}>
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}>
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
