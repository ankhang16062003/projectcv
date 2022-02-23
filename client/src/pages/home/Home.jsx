import './home.scss'
import Header from '../../components/header/Header'
import ListPost from '../../components/listPost/ListPost'
import Category from '../../components/category/Category'
import TopRate from '../../components/toprate/TopRate'
import Helmet from '../../components/helmets/Helmet'

const Home = () => {
  return (
    <Helmet title='Home'>
      <div className='home'>
        <Header />
        <div className="wrapperPostCat">
          <ListPost />
          <Category />
        </div>
        <TopRate />
      </div>
    </Helmet>
  )
}

export default Home