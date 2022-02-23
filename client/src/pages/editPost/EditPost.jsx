import bgWritting from '../../assets/img/bg-login.jpg'
import {Publish} from '@mui/icons-material';
import {Add} from '@mui/icons-material';
import Button from '../../components/button/Button'
import Helmet from '../../components/helmets/Helmet';
import {useRef, useState, useEffect} from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../../firebase'
import Loading from '../../components/loading/Loading'
import { publicRequest } from '../../requestMethods';
import {useNavigate, useLocation} from 'react-router-dom'

const EditPost = () => {
  const post = useLocation().state
  const navigate = useNavigate()
  const [categoryDatabase, setCategoryDatabse] = useState([])

  const titleRef = useRef(null)
  const descRef = useRef(null)
  const imgRef = useRef(null)
  const [file, setFile] = useState(null)
  const [urlPost, setUrlPost] = useState(null)
  const [categories, setCategories] = useState([])
  const [currentUrl, setCurrentUrl] = useState("")
  const [uploaded, setUploaded] = useState(0)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    titleRef.current.value = post.title
    descRef.current.value = post.description 
    imgRef.current.setAttribute('src', post.imgPost)
  }, [post.title, post.description, post.categories, post.imgPost])

  useEffect(() => {
    const getCategoris = async () => {
      try{
        const res = await publicRequest.get('/categories')
        setCategoryDatabse(res.data)
      }catch(err) {
        console.log(err)
      }
    }
    getCategoris()
  }, [])

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(currentUrl)
    }
  }, [currentUrl])

  useEffect(() => {
    uploaded === 1 && setUploading(false)
  }, [uploaded])

  const upload = (datas) => {
    setUploading(true)
    datas.forEach(data => {
      const fileName = `${new Date().getTime()}${data.label}${data.file.name}`
      const storageRef = ref(storage, `images/${fileName}`)

      const uploadTask = uploadBytesResumable(storageRef, data.file)

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, 
        (error) => console.log('upload file is error'),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrlPost(downloadURL)
            setUploaded(pre => pre + 1)
          });
        }
      );
    }) 
  }

  const handleChange = (e) => {
    const collections = e.target.selectedOptions
    setCategories(Array.from(collections, (collection) => collection.value))
  }

  const handleUpload = (e) => {
    e.preventDefault()
    upload([
      {
        label: 'imgPost',
        file: file,
      }
    ])
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const renderUpdate = (titleUpdate, imgUpdate, descUpdate, catUpdate) => {
      if(imgUpdate && catUpdate.length !== 0) return {
        title: titleUpdate,
        imgPost: imgUpdate,
        description: descUpdate,
        categories: catUpdate,
      }
      else if(imgUpdate) return {
        title: titleUpdate,
        imgPost: imgUpdate,
        description: descUpdate,
      }
      else if(catUpdate.length !== 0) return {
        title: titleUpdate,
        description: descUpdate,
        categories: catUpdate,
      } 
      else return {
        title: titleUpdate,
        description: descUpdate,
      }
    }
    try {
       await publicRequest.put(`/posts/${post._id}`, renderUpdate(
        titleRef.current.value,
        urlPost,
        descRef.current.value,
        categories,
       ), {
        headers: {
          token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
        }
      })
      navigate('/posts?page=1')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Helmet title='Write Post'>
      {
        uploading && <Loading />
      }
      <div className='writeAndEditPost'>
          <h1 className="writeAndEditPost__title">Edit my story</h1>
          <div className="writeAndEditPost__writeAndEditPost">
            <div className="writeAndEditPost__writeAndEditPost__item">
              <div className="writeAndEditPost__writeAndEditPost__item__category">
                <label>category: </label>
                <select multiple onChange={handleChange}>
                  {
                    categoryDatabase.map((cat, index) => (
                      <option value={cat.title} key={index}>{cat.title}</option>
                    ))
                  }
                </select>
              </div>
              <img src={currentUrl || bgWritting} alt="bg-writting" ref={imgRef}/>
              <label htmlFor="imgPost"><Publish className='writeAndEditPost__icon--publish' /></label>
              <input  
                className='writeAndEditPost__fileInput' 
                type="file" 
                name='imgPost' 
                id='imgPost'
                onChange = {(e) => {
                  setFile(e.target.files[0])
                  setCurrentUrl(URL.createObjectURL(e.target.files[0]))
                }}
              /> 
            </div>
            <div className="writeAndEditPost__writeAndEditPost__item">
              <Add className='writeAndEditPost__icon--add'/>
              <input 
                className='writeAndEditPost__titleInput' 
                autoFocus 
                type="text" 
                placeholder='title' 
                name='title'
                ref={titleRef} 
              />
            </div>
            <div className="writeAndEditPost__writeAndEditPost__item">
              <textarea 
                className='writeAndEditPost__writeAndEditPost__item__desc custom-scroll' 
                name="content" 
                id="content" 
                placeholder='Tell your story...'
                ref={descRef}
                ></textarea>
            </div>
            <div className="writeAndEditPost__writeAndEditPost__btn">
              {
                (file && uploaded === 1) ? (
                  <Button onClick = {handleUpdate}>update</Button>
                ) : ((file && uploaded < 1) ? (
                  <Button onClick = {handleUpload}>upload</Button>
                ): (
                  <Button onClick = {handleUpdate}>update</Button>
                ))
              }
            </div>
          </div>
      </div>
    </Helmet>
  )
}

export default EditPost