import React from 'react'
import Styles from './Profile.module.css'
import { useOutletContext } from 'react-router-dom';

export default function Profile() {
  const context = useOutletContext().userInfo
  const name = context.email.replace('.',' ').split('@')[0]
  return (
    <div className={Styles.profile}>
      <label>نام کاربر: {name}</label>
      <label>نقش کاربر: نویسنده</label>
    </div>
  )
}
