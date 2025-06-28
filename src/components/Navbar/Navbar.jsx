import React, { useState } from "react"
import Styles from './Navbar.module.css'
import { Link, NavLink } from "react-router-dom"
// import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
// import SearchBox from "../SearchBox/SearchBox";
import { Drawer, List, ListItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

export default function Navbar() {
    const authContext = useContext(AuthContext)
    const [isDrawerShow, setIsDrawerShow] = useState(false)
    // console.log(authContext);
    return (
        <>
            <div className={Styles.navbar}>

                <span
                    className={Styles.menuIcon}
                >

                    <MenuIcon
                        onClick={() => setIsDrawerShow(true)}
                    />
                </span>
                <Link to={'/'} className={Styles.homeIcon}>
                    <HomeIcon />
                </Link>
                <Drawer
                    open={isDrawerShow}
                    onClose={() => setIsDrawerShow(false)}
                    anchor="right"
                    className={Styles.drawer}
                >
                    <CloseIcon onClick={() => setIsDrawerShow(false)} />
                    <List className={Styles.links}>
                        <ListItem>
                            <NavLink to='/'>صفحه اصلی</NavLink>
                        </ListItem>
                        {authContext.isLoggedIn ?
                            <>
                                <ListItem>
                                    <NavLink to='/panel'>پنل</NavLink>
                                </ListItem>
                                <ListItem>
                                    <NavLink
                                        to='/'
                                        onClick={authContext.logout}
                                    >
                                        خروج
                                    </NavLink>
                                </ListItem>
                            </>
                            :
                            <>
                                <ListItem>
                                    <NavLink to='/login'>ورود</NavLink>
                                </ListItem>
                                <ListItem>
                                    <NavLink to='/register'>ثبت نام</NavLink>
                                </ListItem>
                            </>
                        }
                    </List>
                </Drawer>

                <div className={Styles.leftSec}>
                    {/* <Link to={'/login'} className="text-3xl">
                        {authContext.isLoggedIn ? <PersonOutlineOutlinedIcon /> : <LoginIcon />}
                    </Link> */}
                    <div className={Styles.tabs}>
                        <NavLink to='/'>صفحه اصلی</NavLink>
                        {authContext.isLoggedIn ?
                            <>
                                <NavLink to='/panel'>پنل</NavLink>
                                <NavLink
                                    to='/'
                                    onClick={authContext.logout}
                                >
                                    خروج
                                </NavLink>
                            </> :
                            <>
                                <NavLink to='/login'>ورود</NavLink>
                                <NavLink to='/register'>ثبت نام</NavLink>
                            </>
                        }
                    </div>
                </div>
                <div className={Styles.rightSec}>
                    {/* <SearchBox /> */}
                    {/* {authContext.isLoggedIn &&
                        <h3
                            className="cursor-pointer text-3xl"
                            onClick={() => {
                                authContext.logout()
                            }}
                        >
                            ×
                        </h3>} */}
                    {/* <LocalGroceryStoreOutlinedIcon className="text-3xl" /> */}
                </div>
            </div>
        </>
    )
}