import './helmet.scss'
import {useEffect} from 'react'

const Helmet = ({children, title}) => {
  useEffect(() => {
    document.title = title
    window.scrollTo(0, 0)
  }, [title])
  return (
    <div className='helmet'>
      {children}
    </div>
  )
}

export default Helmet