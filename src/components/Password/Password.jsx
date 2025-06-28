import React, { useState, useEffect } from 'react'
import Styles from './password.module.css'
import { useFormikContext } from 'formik'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Password({field}) {
    // console.log(field.name);
    const componentStatus = field.name
    const { setFieldValue } = useFormikContext()
    const [isHide, setisHide] = useState(true)
    const [userInput, setUserInput] = useState('')
    useEffect(() => {
        setFieldValue(componentStatus, userInput)
    }, [userInput])
    const sendVal = (event) => {
        setFieldValue(componentStatus, event.target.value)
    }
    return (
        <div className={Styles.passBox}>
            <input
                type={isHide ? 'password' : 'text'}
                style={{ margin: 0 }}
                placeholder='گذرواژه'
                // placeholder='useEffect بهتره یا func؟'
                // onChange={(e)=> setUserInput(e.target.value)}
                onChange={sendVal}
            // value={userInput}
            />
            <span style={{margin: '5px 0 0 5px'}}
                onClick={() => setisHide(prev => !prev)}>
                {isHide ?
                    <VisibilityIcon color='info' fontSize='small' /> :
                    <VisibilityOffIcon color='info' fontSize='small' />
                }
            </span>
        </div>
    )
}
