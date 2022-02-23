import './postitem.scss'
import {Visibility} from '@mui/icons-material';
import {Link} from 'react-router-dom'

const PostItem = ({post}) => {
  return (
    <div className='postitem'>
          <Link 
            to={`/post/${post._id}`}
            state={post}
            style={{display: 'block'}}
          >
            <div className="postitem__img bg-img overlay" style={{backgroundImage: `url("${post.imgPost}")`}}>
              <Visibility className='postitem__img__icon'/>
            </div>
          </Link>
        <Link 
          to={`/post/${post._id}`}
          state={post}
          style={{display: 'block'}}
        >
          <h3 className='postitem__title text-truncate'>{post.title}</h3>
        </Link>
        <div className="postitem__info">
            <div className='postitem__info--time'>publish: <span>{new Date(post.createdAt).toDateString()}</span></div>
        </div>
        <p className="postitem__desc text-truncate" dangerouslySetInnerHTML={{__html: post.description}}></p>
        <div className="postitem__cat">
          category: 
          {
            post.categories.map((category, index) => (
              <Link key={index} to={`/posts?category=${category}&page=1`}>
                <span>{category}</span>
              </Link>
            ))
          }
        </div>
    </div>
  )
}

export default PostItem