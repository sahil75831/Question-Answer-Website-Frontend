import React, { useContext, useEffect, useState } from "react";
import css from "../../styles/Header.module.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContextProvider";
import logo from "../../images/WORKS.png"
import { BASE_URL } from "../../BaseurlNew";
const Header = () => {
  const {userInformation, setUserInformation} = useContext(UserContext)
  const [profileUserName, setProfileUserName] = useState()
  
  function refresh(){
    window.location.reload()
  }

 
  useEffect(() => {
    fetch(`${BASE_URL}/profile`, {
      method: "GET",
      credentials: "include",
    }).then(res =>
        res.ok
          ? res.json().then((userInfo) => { 
            setUserInformation(userInfo)
            setProfileUserName(userInfo.userName)
            console.log("contextcc",userInformation)
          })
          : res.json().then((err) => console.log("res.json is not okay", err))
      ).catch((err) => {
        console.log("header error: ", err);
      });
  }, []);

  const handleLogout = () => {
    fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    }).then(res => res.ok ? setProfileUserName(null) : console.log("logout failed")).catch((err) => console.log(err));
    refresh()
  };

  return (
    <div className={`${css.wrapper}`}>
      <div className={`${css.container}`}>
        <header className={`${css.header}`}>
          <Link to={"/"}>
          <img src={logo} style={{borderRadius:"50%",width:"5rem" }}></img>
          </Link>
          
          <nav>
            {profileUserName ? (
              <>
                <Link to={"/createNewPost"}>
                  <span className={`${css.createNewBlog}`}>
                   Ask Question
                  </span>
                </Link>
                <button onClick={handleLogout} className={`${css.logout}`}>
                  Logout
                </button>
                <span className={`${css.profileUserName}`}>
                  {profileUserName}
                </span>
              </>
            ) : (
              <>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
              </>
            )}
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
