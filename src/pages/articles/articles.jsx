import React, { useEffect, useState, useContext } from "react"
import styles from './articles.module.css'
import ArticleItem from "../../components/ArticleItem/ArticleItem"
import { Pagination, Alert } from "@mui/material"
import Navbar from "../../components/navbar/navbar"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import CategorytBox from '../../components/Category/Category'
import SearchBox from '../../components/SearchBox/SearchBox'
import { ArticlesContext } from '../../Contexts/ArticlesContext'

export default function Articles() {
    const [filteredArticles, setFilteredArticles] = useState([])
    const [articlesList, setArticlesList] = useState([])
    const [articles, setArticles] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [pagedItems, setPagedItems] = useState({
        first: 0,
        last: 10 * currentPage
    })
    useEffect(() => {
        fetch('http://localhost:3000/articles')
            .then(res => res.json())
            .then(data => {
                setArticlesList(data)
            })
    }, [])
    useEffect(() => {
        setPagedItems(prev => ({
            first: (10 * currentPage) - 10,
            last: 10 * currentPage
        }))
    }, [currentPage])
    useEffect(()=>{
        setCurrentPage(1)
        setPagedItems({
            first: 0,
            last: 10
        })
    }, [filteredArticles])
    useEffect(() => {
        setArticles(filteredArticles.slice(pagedItems.first, pagedItems.last))
    }, [pagedItems])

    useEffect(() => {
        setFilteredArticles(articlesList)
    }, [articlesList])
    const handleArticlesItems = (event, value) => {
        setCurrentPage(value)
    }

    const searchHandler = (userSearch) => {
        setFilteredArticles(userSearch)
    }
    const categoryHandler = (userSelect) => {
        setFilteredArticles(userSelect)
    }
    return (
        <>
            <ArticlesContext.Provider value={articlesList}>
                <Navbar />
                <div className={styles.Box}>
                <Header/>
                    <div className={styles.filterBox}>
                        <SearchBox searchHandler={searchHandler} />
                        <CategorytBox categoryHandler={categoryHandler} />
                    </div>
                    {filteredArticles.length ?
                        <div className={styles.articlesBox}>
                            <div className={styles.articlesList}>
                                {articles.map(article => {
                                    return <ArticleItem key={article.id} {...article} />
                                })}
                            </div>
                            <Pagination count={Math.ceil(filteredArticles.length / 10)} page={currentPage} dir="ltr" onChange={handleArticlesItems} />
                        </div>
                        :
                        <Alert severity="info">هیچ مقاله ای پیدا نشد :(</Alert>
                    }
                </div>
                <Footer/>
            </ArticlesContext.Provider>
        </>
    )
}