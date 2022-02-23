import './category.scss'
import imgProfile from '../../assets/img/profile.jpg'
import {PhoneEnabled, Email} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {publicRequest} from '../../requestMethods'
import {Link} from 'react-router-dom'

const Category = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const getCategoris = async () => {
      try{
        const res = await publicRequest.get('/categories')
        setCategories(res.data)
      }catch(err) {
        console.log(err)
      }
    }
    getCategoris()
  }, [])
  return (
    <div className='category'>
        <div className="category__item">
          <h4>categories</h4>
          <ul className='category__list'>
            {
              categories.map((cat, index) => (
                <Link to ={`/posts?category=${cat.title}&page=1`} key={index}>
                  <li className='category__list__item'>
                    {cat.title}
                  </li>
                </Link>
              ))
            }
          </ul>
        </div>

        <div className="category__item">
          <h4>about me</h4>
          <div className="category__about">
            <div className="category__about__img">
              <img src={imgProfile} alt="img-profile" />
            </div>
            <div className="category__about__info">
              <p>name: <span>Vương An Khang</span></p>
              <p>age: <span>19</span></p>
              <p><PhoneEnabled />: <a href="tel:0868718744">0868718744</a></p>
              <p><Email />: <a href='mailto:vuongankhang1606@gmail.com'>vuongankhang1606@gmail.com</a></p>
              <p>github: <a href='https://github.com/ankhang16062002'>ankhang16062002</a></p>
              <p className='address'>address: 
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239762.27086283648!2d106.13242568098435!3d20.122134130609602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313611e6025f2f29%3A0x7df21e1d7cd2e5db!2zSOG6o2kgSOG6rXUsIE5hbSDEkOG7i25oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1644805016304!5m2!1svi!2s"  
                  loading="lazy" 
                  title='map'
                  >
                </iframe>
              </p>
              <p className='category__desc'>
                A young and passionate developer engineer. Working with HTML, CSS, SCSS, Javascript, 
                Typscript, Bootstrap 5, TailWindCss ReactJS, Redux, NextJS, NodeJS, ExpressJS, Responsive design, GrapthQL, ...
              </p>
            </div>
          </div>
        </div>


    </div>
  )
}

export default Category