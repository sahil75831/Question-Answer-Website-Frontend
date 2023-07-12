import React from 'react'
import css from "../../styles/PostFooter.module.scss"
const PostFooter = () => {
  return (
    <div className={`${css.wrapper}`}>
    <div className={`${css.container}`}>
    <div className={`${css.postAnswer}`}>
      Answer?
    </div>
    </div>
    </div>
  )
}

export default PostFooter
