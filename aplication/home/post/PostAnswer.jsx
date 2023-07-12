import React, { useContext, useEffect, useRef, useState } from "react";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContextProvider";
import css from "../../styles/PostAnswer.module.scss";
import { BASE_URL } from "../../BaseurlNew";

const PostAnswer = () => {
  const [postUnderConsideration, setPostUnderConsideration] = useState();
  const [likeCount, setLikeCount] = useState(false);
  const [buttonStauts, setButtonStauts] = useState();
  const [postUnderConsiderationAnswer, setPostUnderConsiderationAnswer] =
    useState();
  

    const bttnref = useRef()

  const { userInformation, setUserInformation } = useContext(UserContext);
  console.log("userInformation from postview >> ", userInformation);
  const { id } = useParams();
  console.log("useparams > postanswer ", id);
  // why we have to use headers
  // difference between JSON and json
  if (postUnderConsiderationAnswer)
    console.log(
      "postUnderConsiderationAnswer ->>>>>>>>> ",
      postUnderConsiderationAnswer
    );

  function refresh() {
    window.location.reload();
  }

  const handlePostUnderConsideration = async (e) => {
    // e.preventDefault();
    await fetch(`${BASE_URL}/postAnswer/${id}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        repliedTo: id,
        answer: postUnderConsideration,
        repliedBy: userInformation.userName,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) =>
        res.ok
          ? res.json().then((e) => console.log("post vies e>> ", e))
          : console.log("errord in res.json postview")
      )
      .catch((err) => console.log("err from PostAnswer ", err));
  };
  console.log("userinformation : > > :fromlike page: > ", userInformation);

  useEffect((e) => {
    fetch(`${BASE_URL}/showPostAnswer/${id}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) =>
        res.ok
          ? res.json().then((promise) => {
            
              console.log("promise resolved succesffuly ", promise);
              setPostUnderConsiderationAnswer(promise);
            })
          : console.log("res.ok is nor correct post aner usefect")
      )
      .catch((err) => console.log("err from Post Answer useeffect ", err));
  }, [likeCount]);

  // like
  // like
  const handleLikeCount = (e) => {

    e.preventDefault()
   const btn = bttnref.target
   console.log("bttttttn  ", bttnref)
   console.log("bttttttn id-- ", bttnref.current.id)
   console.log("bttttttn id-- ", bttnref.current.id.style)
   console.log("e.target.id> ", e.target.id);
  //  document.getElementsById(id).style.color = 'black';
    const id = e.target.id;
    const idOfCurrentUser = userInformation.id;
    fetch(`${BASE_URL}/showPostAnswerLikeCount/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likeCount, idOfCurrentUser }),
    })
      .then((res) =>
        res.ok
          ? res
              .json()
              .then((promise) => {
                
                console.log("res.ok ", promise)})
              .catch((err) => console.log("err in res.ok ", err))
          : console.log("res.ok is not okay ")
      )
      .catch((err) => console.log("err from Poastanswerli k> >> ", err));
    setLikeCount((prev)=>!prev);
    // refresh();
    // setButtonStauts("none")
  };

  // like
  // like

  


  return (
    <div className={`${css.wrapper}`}>
      <div className={`${css.container}`}>
        <form onSubmit={handlePostUnderConsideration}>
          <textarea
            value={postUnderConsideration}
            onChange={(e) => setPostUnderConsideration(e.target.value)}
          ></textarea>
          <button type="submit">Submit Answer</button>
        </form>

        {/* showng answer of the post */}
        {postUnderConsiderationAnswer ? (
          <div>
            <div>
              {postUnderConsiderationAnswer.map((e, i) => {
                return (
                  <div className={`${css.answerAreaWrapper}`}>
                    <div className={`${css.answerAreaContainer}`}>
                      <div>Date | {e.createdAt.slice(0, 10)}</div>
                      <div>Author | {e.repliedBy} </div>
                      {/* <div>
                        👍 | <span>{e.likeCount} </span>
                      </div> */}
                      <span>Answer :</span>
                      <p>{e.answer}</p>
                    </div>
                    {/* <PostLike /> */}
                    
                    {/* <button type="button" 
                    ref={bttnref}
                      onClick={handleLikeCount}
                      id={e._id}
                      className={`${css.likeButton}`}
                      
                    > */}
                      {/* 👍
                    </button> */}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PostAnswer;
// {postUnderConsiderationAnswer ? (
//   <div>
//     <div>
//       {postUnderConsiderationAnswer.map((e, i) => {
//         return (
//           <div className={`${css.answerAreaWrapper}`}>
//             <div className={`${css.answerAreaContainer}`}>
//               <div>Date | {e.createdAt.slice(0, 10)}</div>
//               <div>Author | {e.repliedBy} </div>
//               <div>
//                 {/* 👍 | <span>{e.likeCount} </span> */}
//               </div>
//               <span>Answer :</span>
//               <p>{e.answer}</p>
//             </div>
//             {/* <PostLike /> */}
//             {/* <button
//               onClick={handleLikeCount}
//               id={e._id}
//               className={`${css.likeButton}`}
//             >
//               👍
//             </button> */}
//           </div>
//         );
//       })}
//     </div>
//   </div>
// ) : (
//   ""
// )}