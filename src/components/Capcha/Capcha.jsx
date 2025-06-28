import React from 'react'
import Styles from './Capcha.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFormikContext } from 'formik'

export default function Capcha() {
    const questionsInfo = [
        { src: 'images/first.jpg', code: 'K99' },
        { src: 'images/second.jpg', code: 'MSK' },
        { src: 'images/third.jpg', code: 'PSM' }
    ]
    const {setFieldValue} = useFormikContext()
    const [capchaQuestion, setCapchaQuestion] = useState(Math.floor(Math.random() * 3))
    const [userInput, setUserInput] = useState('')
    const reassignCapcha = () => {
        let newIndex = Math.floor(Math.random() * 3)
        while (newIndex == capchaQuestion) {
            newIndex = Math.floor(Math.random() * 3)
        }
        setCapchaQuestion(newIndex);
    }
    useEffect(() => {
        if (userInput === questionsInfo[capchaQuestion].code) {
            setFieldValue('capcha', true)
        } else {
            setFieldValue('capcha', '')
        }
    }, [userInput, capchaQuestion])

    return (
        <div className={Styles.capchaBox}>
            <input
                type='text'
                placeholder='کد اعتبارسنجی'
                onChange={(e) => {
                    setUserInput(e.target.value)
                }}
                value={userInput}
            />
            <img className={Styles.questionBox}
                src={questionsInfo[capchaQuestion].src}
                onClick={reassignCapcha}
            />
        </div>
    )
}
