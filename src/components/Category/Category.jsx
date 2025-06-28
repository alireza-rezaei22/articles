import React from 'react'
import Styles from './Category.module.css'
import { useContext } from 'react';
import { ArticlesContext } from '../../Contexts/ArticlesContext';

export default function Category({categoryHandler}) {

  const articlesContext = useContext(ArticlesContext)
  const changeCategory = (event) => {
    let category = event.target.value
    let selected = null
    if (category != 'all') {
      selected = articlesContext.filter(article => {
        return article.category == category
      })
    }else{
      selected = articlesContext
    }
    categoryHandler(selected)
  }
  return (
    <select className={Styles.selectBox} onChange={changeCategory}>
      <option value="all">همه</option>
      <option value="web">web</option>
      <option value="AI">AI</option>
      <option value="game">game</option>
      <option value="block-chain">block chain</option>
      <option value="سایر">سایر</option>
    </select>
  )
}
