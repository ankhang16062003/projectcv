import './detailPost.scss'
import {Edit, Delete} from '@mui/icons-material';
import {Link} from 'react-router-dom'
import Helmet from '../../components/helmets/Helmet';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import {publicRequest} from '../../requestMethods'
import {AuthContext} from '../../context/authContext/AuthContext'
import Button from '../../components/button/Button'

const DetailPost = () => {
    const location = useLocation()
    const post = location.state
    const {user} = useContext(AuthContext)

    const [author, setAuthor] = useState(null)

    useEffect(() => {
        const getAuthor = async () => {
            try {
                const res = await publicRequest.get(`/users/${post.user}`)
                setAuthor(res.data)
            }catch(err) {
                console.log(err)
            }
        }
        getAuthor()
    }, [post])

    const handleDelete = async (id) => {
        try{
            await publicRequest.delete(`/posts/${id}`, {
                headers: {
                    token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
                }
            })
            window.location.replace('/posts?page=1')
        }catch(err) {
            console.log(err)
        }
    }
  return (
    <Helmet title='Detail Post'>
        <div className='detailPost'>
            <div className="detailPost__img">
                <img src= {post.imgPost} alt="detailPost-img" />
            </div>
            <div className="detailPost__title">
                <h2>{post.title}</h2>
                <div className="detailPost__btn">
                    {
                        (user._id === post.user || user.isAdmin) && (
                            <>
                                <Link 
                                    to={`/edit/post/${post._id}`}
                                    state={post}
                                >
                                    <Edit className="detailPost__btn--update"></Edit>
                                </Link>
                                <Delete 
                                    className="detailPost__btn--delete"
                                    onClick={() => handleDelete(post._id)}
                                >
                                </Delete>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="detailPost__info">
                <p className='detailPost__info__author'>
                    author: <Link state={author} to={`/posts?user=${author?.username?.split(" ")?.join("")}&page=1`}><span>{author?.username}</span></Link>
                </p>
                <p className='detailPost__info__time'>published: <span>{new Date(post.createdAt).toDateString()}</span></p>
            </div>
            <p className='detailPost__desc' dangerouslySetInnerHTML={{__html: post.description}}></p>
            <div className="detailPost__btnMore">
                <Link to='/posts?page=1'>
                    <Button>see more</Button>
                </Link>
            </div>
        </div>
    </Helmet>
  )
}

export default DetailPost