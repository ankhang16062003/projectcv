import './toprate.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import {Pagination} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import Button from '../button/Button'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import { useEffect } from 'react'
import {publicRequest} from '../../requestMethods'

const TopRate = () => {
  const swiperOptions = {
    modules : [Pagination],
    pagination: {clickable: true},
    slidesPerView: 1,
    spaceBetween: 40,
    grabCursor: true,
    centeredSlides: true,
    speed: 200,
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 70
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 90
      }
    }
  }

  const [listTops, setListTops] = useState([])

  useEffect(() => {
    const getListTops = async () => {
      try{
        const res = await publicRequest.get('/posts/random/lists', {
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
          }
        })
        setListTops(res.data)
      }catch(err) {
        console.log(err)
      }
    }
    getListTops()
  }, [])

  return (
    <div className='toprate'>
      <h1 className='toprate__title'>Top Rate Post</h1>
      <Swiper {...swiperOptions}>
        {
          listTops.map((post, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className={`toprate__wrapper ${isActive ? 'active' : ''}`}>
                  <div className='toprate__item'>
                    <div className="toprate__item__img">
                      <img src= {post.imgPost} alt="toprate-img" />
                    </div>
                    <div className="toprate__item__info">
                      <h3 className='text-truncate'>{post.title}</h3>
                      <div className="toprate__item__profile">
                        <p className="toprate__item__time">published: <span>{new Date(post.createdAt).toDateString()}</span></p>
                      </div>
                      <p className="toprate__item__desc">{post.description}</p>
                    </div>
                  </div>
                  <div className="toprate__btn">
                    <Link 
                      to={`/post/${post._id}`}
                      state={post}
                    >
                      <Button type='sm'>read more</Button>
                    </Link>
                  </div>
              </div>
              )}
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default TopRate