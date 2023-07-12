import React, { useState } from "react";
import css from "../styles/signinup.module.scss";
import { BASE_URL } from "../BaseurlNew";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerationSuccessfulStatus, setRegisterationSuccessfulStatus] = useState();

  const handleRegistration = async (e) => {
    e.preventDefault();
    await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        console.log("send");
        setRegisterationSuccessfulStatus("thanks for registration")
      })
      .catch((err) => {
        console.log("err", err);
        setRegisterationSuccessfulStatus("try again!")
      });
  };
  return (
    <div className={`${css.wrapper}`}>
      <div className={`${css.container}`}>
        <form onSubmit={handleRegistration} className={`${css.formclass}`}>
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
            register
          </button>
         {registerationSuccessfulStatus}
        </form>
      </div>
    </div>
  );
};

export default Register;
