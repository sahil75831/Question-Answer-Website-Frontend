import React, { useState } from "react";
import css from "../styles/signinup.module.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../BaseurlNew";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  function refresh(){
    window.location.reload()
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(() => {
        navigate("/");
      }).catch((err) => {
        console.log("err", err);
      });
      refresh()
  };
  return (
    <div className={`${css.wrapper}`}>
      <div className={`${css.container}`}>
        <form onSubmit={handleLogin} className={`${css.formclass}`}>
          <input
            type="text"
            placeholder="User Name..."
            required
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email..."
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password..."
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className={`${css.button}`} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
