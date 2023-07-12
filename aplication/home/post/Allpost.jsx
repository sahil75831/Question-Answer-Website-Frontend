import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../UserContextProvider";
import css from "../../styles/allPost.module.scss";
import PostFooter from "./PostFooter";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../BaseurlNew";
const Allpost = () => {
  const { userInformation, setUserInformation } = useContext(UserContext);

  const [allUsersPost, setAllUsersPost] = useState();
  const navigate = useNavigate();

  if (userInformation) console.log("userInformnation-1->>", userInformation);

  useEffect(() => {
    fetch(`${BASE_URL}/allPost`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) =>
        res.ok
          ? res.json().then((allUsersPost) => {
              setAllUsersPost(allUsersPost);
              console.log(">>>>>>>>>>>>>>>>> ", allUsersPost);
            })
          : console.log("problem")
      )
      .catch((err) => {
        console.log("all post error--> ", err);
      });
  }, []);

  console.log("userInformnation-2->>", userInformation);
  console.log("userInformnation-3->>", allUsersPost);

  return userInformation && allUsersPost
    ? allUsersPost.map((posts, i) => {
        if (posts.email !== userInformation.email) {
          const { _id } = posts;
          console.log("____id ", _id);
          return (
            <>
              <div className={`${css.wrapper}`}>
                <div className={`${css.container}`}>
                  <div className={`${css.entries}`}>
                    <div className={`${css.post}`} key={_id}>
                      <div
                        className={`${css.info}`}
                        onClick={(e) => navigate(`/post/${_id}`)}
                      >
                        <h2>{posts.title}</h2>
                        <div className={`${css.author}`}>
                          <span>{posts.updatedAt.slice(0, 10)}</span>
                          <span>{""}</span>
                        </div>
                        <p>{posts.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
      })
    : "";
};

export default Allpost;
