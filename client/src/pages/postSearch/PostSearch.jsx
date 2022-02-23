import './postSearch.scss'
import PostItem from '../../components/positem/PostItem'
import Button from '../../components/button/Button'
import Helmet from '../../components/helmets/Helmet'
import {useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {publicRequest} from '../../requestMethods'
import LoadingLoadmore from '../../components/loadingLoadmore/LoadingLoadmore'

const PostSearch = () => {
  const search = useLocation().search
  const state = useLocation().state
  const user = new URLSearchParams(search).get('user')
  const category = new URLSearchParams(search).get('category')
  const page = new URLSearchParams(search).get('page')

  const [postPages, setPostPages] = useState([])
  const [listPosts, setListPosts] = useState([])
  const [pageCurrent, setPageCurrent] = useState(parseInt(page))
  const [showBtn, setShowBtn] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = () => {
    setPageCurrent(pageCurrent+1)
    setIsLoading(true)
  }

  useEffect(() => {
    if(postPages.length === 0) setShowBtn(false)
    else setListPosts(pre => [...pre, ...postPages])
    postPages.length !== 0 && setShowBtn(true)
    setIsLoading(false)
  }, [postPages])

  useEffect(() => {
    let res
    const getListsPost = async () => {
      if(user) {
        try {
          res = await publicRequest.get(`/posts?userId=${state._id}&page=${pageCurrent}`, {
            headers: {
              token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
            }
          })
          setPostPages(res.data)
        }catch(err) {
          console.log(err)
        }
      }
      else if(category) {
        try {
          res = await publicRequest.get(`/posts?category=${category}&page=${pageCurrent}`, {
            headers: {
              token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
            }
          })
          setPostPages(res.data)
        }catch(err) {
          console.log(err)
        }
      }
      else {
        try {
          res = await publicRequest.get(`/posts?page=${pageCurrent}`, {
            headers: {
              token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
            }
          })
          setPostPages(res.data)
        }catch(err) {
          console.log(err)
        }
      }
    }

    getListsPost()
  }, [user, category, pageCurrent, state])

  return (
    <Helmet title='Post Search'>
      <div className='postSearch'>
          <h2 className="postSearch__title">
            {
              user ? `All posts of ${user}` : (
                category ? `All posts of category ${category}` : 'All posts'
              )
            }
          </h2>
          <div className="postSearch__list">
            {
              listPosts.map((post, index) => (
                <PostItem post={post} key={index}/>
              ))
            }
          </div>
          {
            isLoading && (
              <div className='postSearch__loading'>
                <LoadingLoadmore />
              </div>
            )
          }
          {
            showBtn && (
              <div className="postSearch__btn">
                <Button onClick={handleLoadMore}>load more</Button>
              </div>
            )
          }
      </div>
    </Helmet>
  )
}

export default PostSearch