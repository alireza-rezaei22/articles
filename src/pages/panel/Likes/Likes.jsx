import React, { useEffect, useState } from 'react'
import Styles from './Likes.module.css'
import { Alert } from "@mui/material"
import { Link, useOutletContext } from 'react-router-dom'

export default function Likes() {
  const context = useOutletContext()
  const userId = context.userInfo?.id
  const [likes, setLikes] = useState([])
  console.log(likes);
  useEffect(() => {
    fetch(`http://localhost:3000/likes?${userId}`)
      .then(res => res.json())
      .then(data => setLikes(data))
  }, [])
  const unLike = () => {
    fetch(`http://localhost:3000/likes/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${context.token}`
      }
    })
  }

  return (
    <>
      {likes.length ?
        likes.map(like => {
          return <>
            < div key={like.id} className={Styles.likesBox} >
              <label className={Styles.title}>
                {like.title.length > 40 ? like.title.slice(0, 40) + ' ...' : like.title}
              </label>
              <div className={Styles.actionsBox}>
                <button className={Styles.deleteBtn} onClick={unLike}>حذف</button>
                <Link to={`/articlePage/${like.articleId}`}><button className={Styles.editBtn}>مشاهده</button></Link>
              </div>
            </div >
          </>
        })
        :
        <Alert severity="info">هیچ مقاله مورد علاقه ای پیدا نشد :(</Alert>
      }
    </>
  )
}
