import Styles from './comment.module.css'
import FaceIcon from '@mui/icons-material/Face';
import FaceIcon2 from '@mui/icons-material/Face2';
import FaceIcon3 from '@mui/icons-material/Face3';
import FaceIcon6 from '@mui/icons-material/Face6';
import { useMemo } from 'react';
import React from 'react';

const Comment = React.memo(function Comment(props) {
    let icons= useMemo(()=> [
        <FaceIcon/>,
        <FaceIcon2/>,
        <FaceIcon3/>,
        <FaceIcon6/>
    ],[])
    const {name, comment} = props
    console.log(name, comment);
    return (
        <div className={Styles.commentBox}>
            <span className={Styles.ownerBox}>
            {icons[Math.floor(Math.random()*4)]}
            <h4 className={Styles.CommentOwner}>
                {name}
            </h4>
            </span>
            <p className={Styles.comment}>
                {comment}
            </p>
        </div>
    )
})
export default Comment