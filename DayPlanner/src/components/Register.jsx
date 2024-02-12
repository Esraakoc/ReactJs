import React, {useState} from "react";
import axios from "axios";
import {useUser} from "../UserContext";
import "../style/register.css";
import {Link} from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login, logout, user} = useUser();

  const handleRegister = async () => {
    if (!username || !password) {
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/users", {
        params: {
          username,
        },
      });

      const existingUser = response.data[0];
      if (existingUser) {
        return;
      }

      const newUser = {
        id: Math.floor(Math.random() * 1000) + 1,
        username,
        password,
      };

      const responsePost = await axios.post(
        "http://localhost:3000/users",
        newUser
      );
      if (responsePost.data.id) {
        login(newUser);

        setUsername("");
        setPassword("");
        logout();
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  if (!user) {
    return (
      <div className="regDiv">
        <div>
          <h1 className="reg">REGISTER</h1>
          <div className="regLine"></div>
        </div>
        <div>
          <input
            className="inputName"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="inputEmail"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleRegister}
          className="loginBtn"
        >
          Sign up
        </button>
        <div className="notYetRegisterDiv">
          <div className="loginNotLogin">Are you already a member?</div>
          <Link
            to="/login"
            className="loginLink"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
  return null;
};
export default Register;
