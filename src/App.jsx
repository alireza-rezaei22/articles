import React, { useState, useEffect, useCallback } from 'react';
import './App.css'
import routes from './routes'
import { useRoutes } from 'react-router-dom';
import AlertContext from './Contexts/AlertContext';
import AlertPortal from './components/AlertPortal/AlertPortal'
import { AuthContext } from './Contexts/AuthContext';

function App() {
  let router = useRoutes(routes)
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [alert, setAlert] = useState({
    msg: null,
    isAlertShow: false,
    isSuccess: false
  })

  useEffect(() => {
    // setGetUser(JSON.parse(localStorage.getItem('userInfo')))
    const getToken = JSON.parse(localStorage.getItem('token'))
    if (getToken) {
      setToken(getToken)
      function parseJwt(getToken) {
        const base64Url = getToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
      }
      const decodedToken = parseJwt(getToken);
      const userId = decodedToken.sub;

      fetch(`http://localhost:3000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${getToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserInfo(data)
          setIsLoggedIn(true)
        })
    }

    // fetch('http://localhost:3000/articles')
    //   .then(res => {
    //     if (!res.ok) {
    //       throw new Error
    //     } else {
    //       return res.json()
    //     }
    //   })
    //   .then(data => {
    //     setServerProducts(data)
    //     // console.log(productsContext);
    //   })
  }, [])
  useEffect(() => {
    setTimeout(() => {
      if (alert.isAlertShow) {
        setAlert(prev => ({ ...prev, isAlertShow: false }))
      }
    }, 3000);
  }, [alert])
  const showAlertToast = useCallback((msg, isAlertShow, isSuccess) => {
    setAlert(prev => ({
      ...prev,
      msg,
      isAlertShow,
      isSuccess
    }))
  }, [])
  const login = (userData, token) => {
    localStorage.setItem('token', JSON.stringify(token))
    setToken(token)
    setUserInfo(userData)
    setIsLoggedIn(true)
  }
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUserInfo(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider 
      value={{
        login,
        logout,
        token,
        userInfo,
        isLoggedIn,
      }}
    >
    <div className='flexBox'>
      <AlertContext.Provider
        value={{
          alert,
          showAlertToast
        }}
      >
        {router}
        {alert.isAlertShow && <AlertPortal />}
      </AlertContext.Provider>
    </div>
    </AuthContext.Provider>
  );
}

export default App;