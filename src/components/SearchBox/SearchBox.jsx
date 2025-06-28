import React, { useContext, useRef, useState } from 'react'
import Styles from './SearcchBox.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { ArticlesContext } from '../../Contexts/ArticlesContext';

export default function SearchBox({searchHandler}) {
    const articlesContext = useContext(ArticlesContext)
    const [userSearch, setUserSearch] = useState()
    const inputElem = useRef()

    const search = () => {
        let searched = articlesContext.filter(article=>{
            return article.title.includes(userSearch)
        })
        searchHandler(searched)
        inputElem.current.value = ''
    }
    return (
        <div className={Styles.searchBox}>
            <input
                ref={inputElem}
                className={Styles.searchInput}
                type="text"
                placeholder="جستجوی مقاله ..."
                onChange={(e) => setUserSearch(e.target.value)}
            />
            <SearchIcon className="text-3xl" onClick={search} sx={{ cursor: 'pointer' }} />
        </div>
    )
}
