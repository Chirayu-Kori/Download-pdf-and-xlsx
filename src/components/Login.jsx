import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const endpoint = `abc`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setUsernameError(!username);
    setPasswordError(!password);

    if (username && password) {
      try {
        const response = await axios.post(endpoint, {
          username,
          password,
        });
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        navigate("/download", { replace: true });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-200 flex justify-center items-center">
      <div className="w-96 p-5 bg-white rounded-xl">
        <h1 className="text-3xl font-medium text-slate-800">Login</h1>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-[1px] border-slate-400 p-2 w-full rounded outline-none"
          />
          {usernameError && (
            <p className="text-xs font-medium text-red-500">
              Please enter a username
            </p>
          )}
        </div>
        <div className="mt-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[1px] border-slate-400 p-2 w-full rounded outline-none"
          />
          {passwordError && (
            <p className="text-xs font-medium text-red-500">
              Please enter your password
            </p>
          )}
        </div>
        <button
          className="bg-blue-600 text-white w-full py-2 mt-5 rounded-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
