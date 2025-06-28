import Styles from './Panel.module.css'
import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/Footer/Footer';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { useContext } from 'react';

export default function Panel() {
  let navigate = useNavigate()
  console.log('panel');
  const authContext = useContext(AuthContext)
  // console.log(authContext);
  useEffect(() => {
    if (authContext.isLoggedIn) {
      navigate('/panel/NewAritcle')
    } else {
      navigate('/')
    }
  }, [])
  return (
    <>
      <Navbar />
      <div className={Styles.panelBox}>
        <ul className={Styles.tabs}>
          {/* <NavLink to='/panel/Profile'>پروفایل</NavLink> */}
          <NavLink to='/panel/NewAritcle'>مقاله جدید</NavLink>
          <NavLink to='/panel/bookmarks'>بوکمارک ها</NavLink>
          <NavLink to='/panel/likes'>لایک ها</NavLink>
          <NavLink
            to='/'
            onClick={authContext.logout}
          >
            خروج
          </NavLink>
        </ul>
        <div className={Styles.content}>
          <Outlet context={authContext} />
        </div>
      </div>
      <Footer />
    </>
  );
}