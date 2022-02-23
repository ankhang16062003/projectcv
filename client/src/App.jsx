import './app.scss'
import Home from './pages/home/Home';
import TopBar from './components/topbar/TopBar'
import Footer from './components/footer/Footer'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Info from './pages/info/Info';
import Write from './pages/write/Write';
import DetailPost from './pages/detailPost/DetailPost';
import EditPost from './pages/editPost/EditPost';
import EditUser from './pages/editUser/EditUser';
import PostSearch from './pages/postSearch/PostSearch';
import ListAuthors from './pages/listAuthers/ListAuthers'
import { AuthContext } from './context/authContext/AuthContext';
import {useContext, useEffect, useState} from 'react'
import Loading from './components/loading/Loading';

function App() {
  const {user} = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleLoading = () => setLoading(false)
    window.addEventListener('load', handleLoading)

    return () => {
      window.removeEventListener('load', handleLoading)
    }
  }, [])

  return (
    <div className="app">
      {
        loading && <Loading bgColor='linear-gradient(351deg, rgba(193,120,48,1) 15%, rgba(163,58,105,1) 100%)'/>
      }
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />}/>
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />}/>
          <Route path='/register' element={<Register />}/>
          {
            user && (
              <>
                <Route path='/info/:id' element={<Info/>}/>
                <Route path='/write' element={<Write />}/>
                <Route path='/post/:id' element={<DetailPost />}/>
                <Route path='/posts' element={<PostSearch />}/>
                <Route path='/edit/post/:id' element={<EditPost />}/>
                <Route path='/edit/user/:id' element={<EditUser />}/>
                <Route path='/authors' element={<ListAuthors />}/>
              </>
            )
          }
        </Routes>
        {
          user && <Footer />
        }
        <p className='createby'>Created by: Vương An Khang PTIT, email: <a href='mailto:vuongankhang1606@gmail.com'>vuongankhang1606@gmail.com</a></p>
      </BrowserRouter>

    </div>
  );
}

export default App;
