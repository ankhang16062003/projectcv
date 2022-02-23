import './info.scss'
import Button from '../../components/button/Button'
import {Link, useLocation} from 'react-router-dom'
import Helmet from '../../components/helmets/Helmet'
import {useEffect, useState, useContext} from 'react'
import { publicRequest } from '../../requestMethods'
import {AuthContext} from '../../context/authContext/AuthContext'

const Info = () => {
    const location = useLocation()
    const userCurrent = location.state
    const {user} = useContext(AuthContext)

    const [postUsers, setPostUsers] = useState([])

    useEffect(() => {
        const getPostUsers = async () => {
            try{
                const res = await publicRequest.get(`/posts?userId=${userCurrent._id}`, {
                    headers: {
                        token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
                    }
                })
                setPostUsers(res.data)
            }catch(err) {
                console.log(err)
            }
        }

        getPostUsers()
    }, [userCurrent._id])
  return (
      <Helmet title='Info User'>
        <div className='info'>
            <div className="info__box">
                <div className="info__box__left">
                    <img src= {userCurrent.profilePicture} alt="img-profile" />
                </div>
                <div className="info__box__right">
                    <h2 className="info__box__name">{userCurrent.username}</h2>
                    <p className='info__box__email'><span>email: </span>{userCurrent.email}</p>
                    <div className="info__box__genre"><span>genre: </span>{userCurrent.genre}</div>
                    <div className="info__box__admin"><span>isAdmin: </span>{userCurrent.isAdmin ? 'true' : 'false'}</div>
                    <div className="info__box__posts">
                        <span>all posts:</span>
                        <ul className='custom-scroll'>
                            {
                                postUsers.map(post => (
                                    <Link to={`/post/${post._id}`} state={post} key={post._id}>
                                        <li className='info__box__post'>{post.title}</li> 
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="info__btn">
                        {
                            (userCurrent._id === user._id || user.isAdmin) && (
                                <Link 
                                    to={`/edit/user/${userCurrent._id}`}
                                    state={userCurrent}
                                >
                                    <Button type='sm'>edit</Button>
                                </Link>
                            ) 
                        }
                    </div>
                </div>
            </div>
        </div>
      </Helmet>
  )
}

export default Info