import React, { useEffect, useState } from 'react'
import Styles from './Bookmarks.module.css'
import { Link, useOutletContext } from 'react-router-dom'
import { Alert } from "@mui/material"
export default function Bookmarks() {
  const context = useOutletContext().userInfo
  const userId = context?.id
  console.log('ff');
  const [bookmarks, setBookmarks] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then(res => res.json())
      .then(data => setBookmarks(data.bookmarks))
  }, [])

  const deleteBoomark = () => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then(res => res.json())
      .then(user => {
        console.log(user);
        if (user) {
          fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              bookmarks: [
                ...user.bookmarks,
                {
                  'id': user.bookmarks.length + 1,
                  articleId,
                  title: sliced
                }
              ]
            })
          })
            .then(res => res.json())
            .then(data => console.log(data))
        }
      })
  }
  return (
    <>
      {bookmarks.length ?
        bookmarks.map(bookmark => {
          return < div key={bookmark.id} className={Styles.bookmarkBox} >
            <label className={Styles.title}>
            {bookmark.title.length > 40 ? bookmark.title.slice(0, 40) + ' ...' : bookmark.title}
              </label>
            <div className={Styles.actionsBox}>
              <button className={Styles.deleteBtn} onClick={() => deleteBoomark}>حذف</button>
              <Link to={`/articlePage/${bookmark.articleId}`}><button className={Styles.editBtn}>مشاهده</button></Link>
            </div>
          </div >
        })
        :
        <Alert severity="info">هیچ بوکمارکی پیدا نشد :(</Alert>
      }
    </>
  )
}
