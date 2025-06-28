import React, { useEffect, useState, useContext } from 'react'
import Styles from './NewAritcle.module.css'
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import AlertContext from '../../../Contexts/AlertContext';
import { useOutletContext } from 'react-router-dom';

export default function NewAritcle() {
  const alertContext = useContext(AlertContext)
  const [articleTitle, setArticleTile] = useState(null)
  const [articleText, setArticleText] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [category, setCategory] = useState('سایر')
  const context = useOutletContext().userInfo
  const userName = context?.email.replace('.', ' ').split('@')[0]
  useEffect(() => {
    console.log(category);
  }, [category])

  const submitArticle = (event) => {
    event.preventDefault()
    if (articleTitle && articleText && imgSrc) {
      fetch('http://localhost:3000/articles', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'title': articleTitle,
          'text': articleText,
          'writer': userName,
          'img': imgSrc,
          category
        })
      })
        .then(res => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text)
            })
          } else {
            return res.json()
          }
        })
        .then(data => {
          alertContext.showAlertToast('مقاله با موفقیت ثبت شد', true, true)
        })
        .catch((text) => {
          switch (text.message) {
            case ('Failed to fetch'): {
              alertContext.showAlertToast('خطا در اتصال به سرور', true, false)
            }
          }
        })
    } else {
      alertContext.showAlertToast('لطفا همه مقادیر را وارد کنید', true, false)
    }
  }
  const cloud = useCKEditorCloud({
    version: '45.1.0',
    premium: true
  });
  if (cloud.status === 'error') {
    return <div>Error!</div>;
  }
  if (cloud.status === 'loading') {
    return <div>Loading...</div>;
  }
  const {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Alignment,
    Heading,
    HeadingButtonsUI
  } = cloud.CKEditor;

  return (
    <div className={Styles.newAritcleBox}>
      <div className={Styles.inputs}>
        <div className={Styles.row}>
          <div className={Styles.secOne}>
            <span className={Styles.inputBox}>
              <label>عنوان مقاله:</label>
              <input
                placeholder='عنوان ...'
                type="text"
                onChange={e => setArticleTile(e.target.value.trim())}
              />
            </span>
            <span className={Styles.inputBox}>
              <label>دسته بندی:</label>
              <select
                className={Styles.category}
                onChange={e => setCategory(e.target.value)}
                defaultValue={'defaultValue' || -1}
                disabled={false}
              >
                <option value="web" selected>web</option>
                <option value="ai">AI</option>
                <option value="game">game</option>
                <option value="block-chain">block chain</option>
                <option value="سایر">سایر</option>
              </select>
            </span>
          </div>
          <span className={Styles.inputBox}>
            <label>بارگذاری عکس:</label>
            <input
              type="file"
              accept='image/*'
              onChange={(e) => setImgSrc(e.target.value)}
            />
          </span>
        </div>
        <CKEditor
          className={Styles.editor}
          editor={ClassicEditor}
          data={'<p>متن مقاله...</p>'}
          plaseholder='fff'
          config={{
            licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDg1NjMxOTksImp0aSI6IjE0NzAxOTRiLTVkYTMtNDc3NC1hN2VlLTY4MDU0MDhhOWZhNiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjYyOTVjMjYyIn0.C2q7ecM7VvOLWp9F-NyTCLp5dQbbwpQ2_je4dl0kvdSmTkbiPIxiWql3mdI5iag2gHWB6SzK567r75YalzkyJA',
            plugins: [Essentials, Paragraph, Bold, Italic, Alignment, Heading],
            toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'alignment', 'Heading']
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            console.log(data);
            setArticleText(data)
          }}
        />
      </div>
      <button
        className={Styles.submitBtn}
        onClick={submitArticle}
      >
        ثبت مقاله
      </button>
    </div>
  )
}
