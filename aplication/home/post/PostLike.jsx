import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import css from "../../styles/Post.module.scss"
const PostLike = () => {
    const [likeCount, setLikeCount] = useState(0)
    const id = useParams();
    const handleLike = () =>{
        setLikeCount(1)
    }

  return (
    <div className={`${css.wrapper}`}>
    <div className={`${css.container}`}>
    <button className={`${css.like}`} onClick={handleLike}>
      like
    </button>
    </div>
    </div>
  )
}

export default PostLike
