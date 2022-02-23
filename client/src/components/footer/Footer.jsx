import './footer.scss'
import {Facebook, Instagram, Twitter, WhatsApp} from '@mui/icons-material';
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <ul className="footer__left">
          <Link to='/write'>
            <li>write</li>
          </Link>
          <Link to='/authors'>
            <li>authors</li>
          </Link>
        </ul>
        <div className="footer__right">
            <span>follow: </span>
            <div className="footer__social">
                <Facebook className='footer__icon'/>
                <Instagram className='footer__icon'/>
                <Twitter className='footer__icon'/>
                <WhatsApp className='footer__icon'/>
            </div>
        </div>
    </div>
  )
}

export default Footer