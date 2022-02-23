import Button from '../button/Button'
import PostItem from '../positem/PostItem'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {publicRequest} from '../../requestMethods'
import './listpost.scss'

const ListPost = () => {
  const [randomLists, setRandomLists] = useState([])
  const [view, setView] = useState(() => {
    return window.innerWidth
  })
  
  useEffect(() => {
    const handleResize = () => {
      const size = window.innerWidth
      setView(size)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const getRandomLists = async () => {
      const res = await publicRequest.get('posts/random/lists/', {
        headers: {
          token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
        }
      })
      setRandomLists(res.data)
    }
    getRandomLists()
  }, [])

  return (
    <div className='listpost'>
      {
        (view >= 768 && view <= 1400) ? (
          <>
          {
            randomLists.slice(0, 3).map(post => (
              <PostItem post={post} key={post._id}/>
            ))
          }
          </>
        ) : (
          <>
            {
              randomLists.map(post => (
                <PostItem post={post} key={post._id} />
              ))
            }
          </>
        )
      }
      <div className="listpost__btn">
        <Link to='/posts?page=1'>
          <Button>xem tất cả</Button>
        </Link>
      </div>
    </div>
  )
}

export default ListPost