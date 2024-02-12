import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "../UserContext.jsx";
import "../style/login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login, user} = useUser();

  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/users", {
        params: {
          username,
          password,
        },
      });

      const user = response.data[0];
      if (user) {
        login(user);
        setUsername("");
        setPassword("");
        console.log("Successfully logged in.", user);
        navigate("/create");
      } else {
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  if (!user) {
    return (
      <div className="loginDiv">
        <div>
          <h1 className="login">LOGIN</h1>
          <div className="loginLine"></div>
        </div>
        <div>
          <input
            className="inputEmail"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="inputPassword"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="loginBtn"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="notYetRegisterDiv">
          <div className="loginNotLogin">Not yet registered? </div>
          <Link
            to="/register"
            className="loginLink"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }
  return null;
};

export default Login;
