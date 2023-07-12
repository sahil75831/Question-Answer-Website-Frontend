import React, { useState , useContext} from "react";
import css from "../../styles/CreatePost.module.scss";
import { UserContext } from "../../UserContextProvider";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../BaseurlNew";

const UpdatePost = () => {
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [content, setContent] = useState();
  const {userInformation, setUserInformation} = useContext(UserContext)
  const id = useParams().id
  console.log("id update >> ", id)
  const handleCreatePostSubmit = async (e) => {
    e.preventDefault();
    const email = userInformation.email
    
    await fetch(`${BASE_URL}/updatePost/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, title, summary, content }),
    })
      .then((res) =>
        res.ok
          ? res
              .json()
              .then((promise) =>
                console.log("promise from res.json PATCH page ", promise)
              )
              .catch((err) =>
                console.log("error from res.ok patch page ", err)
              )
          : console.log("error in fetching response")
      )
      .catch((err) => console.log("error from patch req ", err));


  };
  return (
    <div className={`${css.wrapper}`}>
      <div className={`${css.container}`}>
        <form onSubmit={handleCreatePostSubmit} className={`${css.formclass}`}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <textarea
            className={`${css.textArea}`}
            placeholder="write your post here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
