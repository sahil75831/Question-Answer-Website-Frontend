import React, { useState , useContext} from "react";
import css from "../../styles/CreatePost.module.scss";
import { UserContext } from "../../UserContextProvider";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../BaseurlNew";
const CreatePost = () => {

  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [content, setContent] = useState();
  const {userInformation, setUserInformation} = useContext(UserContext)
  const navigate = useNavigate()
  
  const handleCreatePostSubmit = async (e) => {
    e.preventDefault();
    const email = userInformation.email
    
    await fetch(`${BASE_URL}/createpost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, title, summary, content }),
      credentials: "include",
    })
      .then((res) => (res.ok ? console.log(title) : console.log("post failed")))
      .catch((err) => console.log(err));
    navigate('/')
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

          <button type="submit">Create Post</button>
        </form>
      </div>
      
    </div>
  );
};

export default CreatePost;
