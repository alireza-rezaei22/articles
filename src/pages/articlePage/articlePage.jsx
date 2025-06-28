import Navbar from "../../components/navbar/navbar";
import Styles from './articlePage.module.css'
import Comments from "../../components/comments/comentns";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { AuthContext } from "../../Contexts/AuthContext";

export default function ArticlePage() {
  const authContext = useContext(AuthContext)
  const param = useParams()
  const { articleId } = param
  const [pageInfo, setpageInfo] = useState([])
  const [articleLiks, setArticleLiks] = useState([])
  const [isLiked, setIsliked] = useState(false)
  const [isMarked, setIsMarked] = useState(false)

  const { title, text, writer, category } = pageInfo[0] || []
  const { id: userId } = authContext.userInfo || []

  useEffect(() => {
    fetch(`http://localhost:3000/articles?id=${articleId}`)
      .then(res => res.json())
      .then(data => setpageInfo(data))
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
              userId: authContext.userInfo.id
            })
          })
        }
        case ('unlike'): {
          fetch(`http://localhost:3000/likes/${userId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authContext.token}`
            }
          })
        }
        case ('bookmark'): {
          // setIsMarked(true)
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
                        articleId
                      }
                    ]
                  })
                })
                  .then(res => res.json())
                  .then(data => console.log(data))
              }
            })
        }

      }
    } else {
      alertContext.showAlertToast('لطفا ابتدا وارد شوید', true, false)
    }
  }

  return (
    <>
      <Navbar />
      <div className={Styles.articleBox}>
        <div className={Styles.sec}>
          <span className={Styles.writerBox}>
            <PersonIcon />
            <h4 className={Styles.writer}>نویسنده: {writer}</h4>
          </span>
          <h4 className={Styles.category}>دسته بندی: {category}</h4>
        </div>
        <div className={Styles.articleText}>
          <h1 className={Styles.title}>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>

        <span className={Styles.acrions}>
          <span>
            {isLiked ?
              <FavoriteIcon onClick={() => handleActions('unLike')} /> :
              <FavoriteBorderIcon onClick={() => handleActions('like')} />
            }
            <label>{articleLiks.length}</label>
          </span>
          {isMarked ?
            <BookmarkIcon onClick={() => handleActions('unBookmark')} /> :
            <BookmarkBorderIcon onClick={() => handleActions('bookmark')} />
          }
        </span>
        <Comments articleId={articleId} />
      </div>
    </>
  )
}