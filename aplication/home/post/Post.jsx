import React, { useContext, useEffect, useState } from "react";
import css from "../../styles/Post.module.scss";
import { UserContext } from "../../UserContextProvider";
import Allpost from "./Allpost";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../BaseurlNew";

const Post = () => {
  const { userInformation, setUserInformation } = useContext(UserContext);
  const [userPost, setUserPost] = useState();
  const [answer, setAnswer] = useState();
  const [displayStatus, setDisplayStatus] = useState("none");

  const navigate = useNavigate()
  function refresh() {
    window.location.reload();
  }
  
  console.log("u-s-e-r", userInformation);
  useEffect(() => {
    fetch(`${BASE_URL}/getpost`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) =>
        res.ok
          ? res.json().then((post) => {
              console.log("ppspsp,", post);
              setUserPost(post);
            })
          : console.log("response failed")
      )
      .catch((err) => console.log("erro is coomin", err));
  }, []);

  console.log("userPOst", userPost);
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  const currentDay = date.getDate();
  const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
  //Adding 1 because the month index starts from 0
  // The padStart() method pads a string from the start. It pads the string with another string (multiple times) until it reaches a given length.

  // console.log("userpost.username", userPost.userName)

  const deletePost = (id) => {
    fetch(`${BASE_URL}/deletepost/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) =>
        res.ok
          ? res
              .json()
              .then((promise) =>
                console.log("promise from res.json delete page ", promise)
              )
              .catch((err) =>
                console.log("error from res.ok delete page ", err)
              )
          : console.log("error in fetching response")
      )
      .catch((err) => console.log("error from delet req ", err));

      refresh()

      // .then(res => res.text()).then(res => console.log("resss ",res))
      // Note that there's no need to parse the result. Parsing res to text will return in an empty string, and parsing it to JSON will give a parsing error.
      // It is necessary to resolve promise, because first res is promise.
  };

  const updatePost = (id) => {
    navigate(`/updatePost/${id}`)


      // refresh()

      // .then(res => res.text()).then(res => console.log("resss ",res))
      // Note that there's no need to parse the result. Parsing res to text will return in an empty string, and parsing it to JSON will give a parsing error.
      // It is necessary to resolve promise, because first res is promise.
  };
  return (
    <>
      {userInformation && userPost ? (
        <>
          <div className={`${css.wrapper}`}>
            <div className={`${css.container}`}>
              <div className={`${css.entries}`} >
                {userPost.map((posts, i) => {
                  if (posts.email === userInformation.email) {
                    return (
                      <>
                      
                        <div className={`${css.post}`} key={i}  >
                        <div style={{display:"flex", flexDirection:"column" , gap:"1rem" }}>
                        <div
                            onClick={() => deletePost(userPost[i]._id)}
                            className={`${css.deletePost}`}
                          >
                            x
                          </div>
                          <div
                            onClick={() => updatePost(userPost[i]._id)}
                            className={`${css.deletePost}`}
                          >
                            🖊
                          </div>
                        </div>

                          <div className={`${css.info}`} onClick={()=>{navigate(`/postAnswer/${userPost[i]._id}`)}}>
                            <h2>{posts.title}</h2>
                            <div className={`${css.author}`}>
                              <span>{userInformation.userName}</span>
                              <span>{"|"}</span>
                              <span>{posts.updatedAt.slice(0, 10)}</span>
                            </div>
                            <p>
                              <b>Summary : </b>
                              {posts.summary}
                            </p>
                            <p>
                              <b>Question : </b>
                              {posts.content}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <div>
        <Allpost />
      </div>
    </>
  );
};

export default Post;
