import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import ReactDom from 'react-dom'
import { Snackbar, Alert } from '@mui/material'
import AlertContext from '../../Contexts/AlertContext'

export default function AlertPortal() {
    const alertContext = useContext(AlertContext)
    console.log(alertContext);
    const [alert, setalert] = useState(alertContext.alert)

    return ReactDom.createPortal(
        <Snackbar
            open={alert.isAlertShow}
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Alert severity={alert.isSuccess ? 'success' : 'error'} variant="filled">
                {alert.msg}
            </Alert>
        </Snackbar>
        , document.getElementById('alert'))
}