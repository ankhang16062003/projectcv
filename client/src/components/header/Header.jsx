import './header.scss'
import imgHeader from '../../assets/img/imgHeader.jpg'

const Header = () => {
  return (
    <div className='header'>
        <div className="header__effect"></div>
        <div className="header__effect"></div>
        <div className="header__effect"></div>
        <div className="header__title">
            <span className='header__title--text'>post and publish</span>
            <span className='header__title--name'>your blog</span>
        </div>
        <img src= {imgHeader} alt="img-header" />
    </div>
  )
}

export default Header