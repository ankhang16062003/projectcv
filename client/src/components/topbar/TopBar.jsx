import './topbar.scss'
import {Facebook, Instagram, Twitter, WhatsApp, Settings, Menu, Close} from '@mui/icons-material';
import { useEffect, useRef, useState, useContext } from 'react';
import Button from '../button/Button';
import {Link, useLocation} from 'react-router-dom'
import { AuthContext } from '../../context/authContext/AuthContext';
import {logout} from '../../context/authContext/AuthAction'


const listNavs = [
    {
        path: '/',
        display: 'home'
    },
    {
        path: '/write',
        display: 'write'
    },
    {
        path: '/authors',
        display: 'authors'
    },
    {
        path: '/posts?page=1',
        display: 'posts'
    },
    
]


const TopBar = () => {
    const {user, dispatch} = useContext(AuthContext)
    const location = useLocation()
    let pathCurrent = location.pathname
    const search = location.search
    if(search) pathCurrent += search
    const [appendMenu, setAppendMenu] = useState(false)

    const topbarRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            if(document.documentElement.scrollTop > 200 || document.body.scrollTop > 200) {
                topbarRef.current.classList.add('shirk')
            } else {
                topbarRef.current.classList.remove('shirk')
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

  return (
    <div className="topbar" ref={topbarRef}>
        <div className="topbar__left">
            <a href="https://www.facebook.com/an.khang.5623293"><Facebook/></a>
            <a href="https://www.instagram.com/khangvuongan/"><Instagram /></a>
            <a href="https://www.instagram.com/khangvuongan/"><Twitter /></a>
            <a href="https://www.instagram.com/khangvuongan/"><WhatsApp /></a>
        </div>
        {
            appendMenu ? (
                <Close className='topbar__menu' onClick = {() => setAppendMenu(false)}/>
            ) : (
                <Menu className='topbar__menu' onClick = {() => setAppendMenu(true)}/>
            )
        }
        <ul className= {`topbar__center ${appendMenu ? 'append' : ''}`}>
            {
                listNavs.map((item, index) => (
                    <Link to={item.path} key = {index}>
                        <li 
                            className={`topbar__center__item ${item.path === pathCurrent ? 'active' : ''}`} 
                            onClick={() => setAppendMenu(false)}
                        >
                            {item.display}
                        </li>
                    </Link>
                ))
            }
        </ul>
        <div className="topbar__right">
            {
                user ? (
                    <Link 
                        to = {`/info/${user._id}`}
                        state={user}    
                    >
                        <img src= {user.profilePicture} alt="img-profile" />
                    </Link>
                ) : (
                    <div className="topbar__right__btn">
                        <Link to='/login'>
                            <Button type="sm">sign in</Button>
                        </Link>
                    </div>
                )
            }
            {
                user ? (
                    <div className="topbar__right__setting">
                        <Settings className='topbar__right__setting__icon'/>
                        <div 
                            className='topbar__right__setting--drop' 
                            onClick={() => {
                                    dispatch(logout()) 
                                    window.location.replace('/login')
                                }
                            }
                        >
                            logout
                        </div>
                    </div>
                ) : (
                    <div className="topbar__right__btn">
                        <Link to='/register'>
                            <Button type="sm">sign up</Button>
                        </Link>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default TopBar