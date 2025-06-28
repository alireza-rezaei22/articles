import React from 'react'
import Styles from './Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
        <ul className={Styles.footeritems}>
            <Link to='/'>صفحه اصلی</Link>
            <Link to='/login'>ورود</Link>
            <Link to='/register'>ثبت نام</Link>
        </ul>
        <ul className={Styles.footeritems}>
            <a href='https://ir.linkedin.com/in/alireza-rezaei22'><li>linkedin</li></a>
            <a href='https://github.com/alireza-rezaei22'><li>gitHub</li></a>
        </ul>
    </footer>
  )
}
