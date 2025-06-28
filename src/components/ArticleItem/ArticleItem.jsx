import React, { useEffect } from 'react'
import Styles from './ArticleItem.module.css'
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Link } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext'
import AlertContext from '../../Contexts/AlertContext'
import { useContext } from 'react';

export default function articleItem(props) {
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const [articleLiks, setArticleLiks] = useState([])
  const [isLiked, setIsliked] = useState(false)
  const { id: articleId, title, category, text } = props
  const { id: userId } = authContext.userInfo || []
  const [isMarked, setIsMarked] = useState(false)
  const start = text.indexOf('>')
  const end = text.indexOf('<', start)
  const sliced = text.substring(start + 1, end)

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        data.bookmarks.find(bookmark => {
          if (bookmark.articleId == articleId) {
            setIsMarked(true)
          }
        })
      })
    fetch(`http://localhost:3000/likes?userId=${userId}&articleId=${articleId}`)
      .then(res => res.json())
      .then(data => {
        if (data.length) {
          setIsliked(true)
        }
      })
    fetch(`http://localhost:3000/likes?articleId=${articleId}`)
      .then(res => res.json())
      .then(data => setArticleLiks(data))
  }, [])

  const handleActions = (action) => {
    if (authContext.isLoggedIn) {
      switch (action) {
        case ('like'): {
          fetch(`http://localhost:3000/likes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              articleId: articleId,
              userId: authContext.userInfo.id,
              title: sliced
            })
          })
          break
        }
        case ('unlike'): {
          console.log('here');
          fetch(`http://localhost:3000/likes/${userId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authContext.token}`
            }
          })
          break
        }
        case ('bookmark'): {
          console.log(userId);
          fetch(`http://localhost:3000/users/${userId}`)
            .then(res => res.json())
            .then(user => {
              console.log(user);
              if (user) {
                fetch(`http://localhost:3000/users/${userId}`, {
                  method: 'PATCH',
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
          break
        }

      }
    } else {
      alertContext.showAlertToast('لطفا ابتدا وارد شوید', true, false)
    }
  }
  return (
    <div className={Styles.itemBox}>
      <div className={Styles.secOne}>
        <Link to={`/articlePage/${articleId}`}>
          <img
            src='public/images/item-img.jpg'
            alt="article image"
          />
        </Link>
        <Link to={`/articlePage/${articleId}`}>
          <h3 className={Styles.title}>
            {title.length > 20 ? title.slice(0, 15) + ' ...' : title}
          </h3>
          <p className={Styles.describe}>
            {sliced.length > 20 ? sliced.slice(0, 40) + ' ...' : sliced}
          </p>
        </Link>
      </div>
      <div className={Styles.secTwo}>
        <h5 className={Styles.category}>{category}</h5>
        <span className={Styles.acrions}>
          <span>
            {isLiked ?
              <FavoriteIcon onClick={() => handleActions('unlike')} /> :
              <FavoriteBorderIcon onClick={() => handleActions('like')} />
            }
            <label>{articleLiks.length}</label>
          </span>
          {isMarked ?
            <BookmarkIcon onClick={() => handleActions('unBookmark')} /> :
            <BookmarkBorderIcon onClick={() => handleActions('bookmark')} />
          }
        </span>
      </div>
    </div>
  )
}
