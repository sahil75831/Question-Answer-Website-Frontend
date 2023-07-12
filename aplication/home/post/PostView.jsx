import React, { useEffect, useState, useContext } from "react";
import css from "../../styles/PostView.module.scss";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContextProvider";
import PostAnswer from "./PostAnswer";
import { BASE_URL } from "../../BaseurlNew";
const PostView = () => {
  const [userPostView, setUserPostView] = useState();
  const [ userInformation1, setUserInformation1 ] = useState()
  const { id } = useParams();

useEffect(() => {
    fetch(`${BASE_URL}/allPost`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) =>
        res.ok
          ? res.json().then((allUsersPost) => {
              setUserInformation1(allUsersPost);
            })
          : console.log("problem")
      )
      .catch((err) => {
        console.log("ERROR ", err);
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/post/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) =>
        res.ok
          ? res.json().then((userpostview) => {
              
              setUserPostView(userpostview);
            })
          : console.log("postview-response Is not okay")
      )
      .catch((err) => console.log("postview erroe ->> ", err));
  }, []);
 
  return (
    userPostView ?  <div className={`${css.wrapper}`}>
    <div className={`${css.container}`}>
      <div className={`${css.entries}`}>
        <div className={`${css.post}`} >
          <div className={`${css.info}`}>
            <h2>{userPostView.title}</h2>
            <div className={`${css.author}`}>
              <span>{userPostView.updatedAt.slice(0, 10)}</span>
              <span>{""}</span>
            </div>
            <p style={{border:"2px solid #ddd" , padding:"20px", borderRadius:"10px"}}>
            <h4><i>Summary : | </i></h4>
            {userPostView.summary}</p>
            <p style={{padding:"20px"}}>{userPostView.content}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
        <PostAnswer />
    </div>
  </div>:""
  );
};

export default PostView;
