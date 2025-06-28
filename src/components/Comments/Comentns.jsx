import { useEffect, useState, useContext } from "react"
import Styles from './Comments.module.css'
import Comment from '../Comment/Comment'
import { AuthContext } from "../../Contexts/AuthContext";
import AlertContext from "../../Contexts/AlertContext";

export default function Comments({articleId}) {
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
    const userInfo = authContext?.userInfo
    const [comments, setComments] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:3000/comments?articleId=${articleId}`)
        .then(res =>  res.json())
          .then(data => {
            setComments(data)
          })
    },[])
    const [userComment, setUserComment] = useState()
    const submitComment = () => {
        if (authContext.isLoggedIn) {
            if (userComment) {
                fetch('http://localhost:3000/comments', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        articleId: articleId,
                        name: userInfo.email.replace('.', ' ').split('@')[0],
                        comment: userComment,
                    })
                  })
                    .then(res => {
                      console.log(res);
                      if (!res.ok) {
                        return res.text().then((text) => {
                          throw new Error(text)
                        })
                      } else {
                        return res.json()
                      }
                    })
                    .then(data => {
                      alertContext.showAlertToast('دیدگاه شما با موفقیت ثبت شد', true, true)
                    })
                    .catch((text) => {
                      console.log(text.message);
                      switch (text.message) {
                        case ('Failed to fetch'): {
                          alertContext.showAlertToast('خطا در اتصال به سرور', true, false)
                        }
                      }
                    })
                // setComments(prev => {
                //     return [
                //         ...prev,
                //         {
                //             // id: allComments.length + 1,
                //             articleId: articleId,
                //             name: userInfo.email.replace('.', ' ').split('@')[0],
                //             comment: userComment
                //         }
                //     ]
                // })
            }else{
                alertContext.showAlertToast('لطفا مقدرای وارد کنید', true, false)
                
            }
        }else{
            alertContext.showAlertToast('لطفا ابتدا وارد شوید', true, false)

        }
        setUserComment('')
    }
    return (
        <div className={Styles.commentsBox}>
            <h2 className='text-xl'>دیدگاه کاربران</h2>
            <div className={Styles.commentsList}>
                {(comments.length > 0) ? comments.map(comment => {
                    return <Comment key={comment.id} {...comment} />
                }) :
                <p>دیدگاهی وجود ندارد</p>
                }
            </div>
            <div className={Styles.newCommentBox}>
                <h2 className=''>ثبت دیدگاه</h2>
                <textarea className={Styles.inputComment}
                    value={userComment} onChange={e=> setUserComment(e.target.value)}>

                </textarea>
                <button className={Styles.submitCommentBtn} onClick={submitComment}>ارسال</button>
            </div>
        </div>
    )
}