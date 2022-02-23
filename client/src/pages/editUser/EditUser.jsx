import {useState, useEffect, useRef} from 'react'
import bgRegister from '../../assets/img/bg-login.jpg'
import Button from '../../components/button/Button'
import Loading from '../../components/loading/Loading'
import {Publish} from '@mui/icons-material';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Helmet from '../../components/helmets/Helmet'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../../firebase'
import { publicRequest } from '../../requestMethods'


const Register = () => {
  const userCurrent = useLocation().state

  const [values, setValues] = useState({
    username: userCurrent.username,
    email: userCurrent.email,
    password: "",
    genre: userCurrent.genre,
  })

  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const genreRef = useRef(null)
  const urlProfileRef = useRef(null)

  const navigate = useNavigate()
  const [urlProfile, setUrlProfile] = useState(null)
  const [file, setFile] = useState(null)
  const [currentUrl, setCurrentUrl] = useState("")
  const [uploaded, setUploaded] = useState(0)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    usernameRef.current.value = userCurrent.username
    emailRef.current.value = userCurrent.email
    passwordRef.current.value = 'a6vodich@'
    genreRef.current.value = userCurrent.genre
    urlProfileRef.current.setAttribute('src', userCurrent.profilePicture)
  }, [
    userCurrent.username,
    userCurrent.email,
    userCurrent.genre,
    userCurrent.profilePicture,
  ])

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(currentUrl)
    }
  }, [currentUrl])

  useEffect(() => {
    uploaded === 1 && setUploading(false)
  }, [uploaded])

  const listOptions = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Vương An Khang',
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      pattern: '^[A-Za-z0-9 ]{3,16}$',
      required: true,
      formRef: usernameRef,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'vuongankhang1606@gmail.com',
      errorMessage: "It should be a valid email address!",
      required: true,
      formRef: emailRef,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true,
      formRef: passwordRef,
    },
  ]

  const handleChange = (e) => {
    const value = e.target.value
    setValues({...values, [e.target.name]: value})
  }

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
            setUrlProfile(downloadURL)
            setUploaded(pre => pre + 1)
          });
        }
      );
    }) 
  }

  const handleUpload = (e) => {
    e.preventDefault()
    upload([
      {
        label: 'profilePicture',
        file: file,
      },
    ])
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const renderUpdate = (usernameUpdate, emailUpdate, passwordUpdate, genreUpdate, profileUpdate) => {
      if(passwordUpdate && profileUpdate) return {
        username: usernameUpdate,
        email: emailUpdate,
        password: passwordUpdate,
        genre: genreUpdate,
        profilePicture: profileUpdate,
      }
      else if(passwordUpdate) return {
        username: usernameUpdate,
        email: emailUpdate,
        password: passwordUpdate,
        genre: genreUpdate,
      }
      else if(profileUpdate) return {
        username: usernameUpdate,
        email: emailUpdate,
        genre: genreUpdate,
        profilePicture: profileUpdate,
      } 
      else return {
        username: usernameUpdate,
        email: emailUpdate,
        genre: genreUpdate,
      }
    }
    try {
       const res = await publicRequest.put(`/users/${userCurrent._id}`, renderUpdate(
        values.username,
        values.email,
        values.password,
        values.genre,
        urlProfile,
       ), {
        headers: {
          token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
        }
      })
      navigate(`/info/${userCurrent._id}`, {state: res.data})
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Helmet title='Register'>
      {uploading && <Loading/>}
      <div className='registerAndEdit bg-img' style={{backgroundImage: `url(${bgRegister})`}}>
          <div className="registerAndEdit__login">
            <Link to='/login'>
              <Button>Home</Button>
            </Link>
          </div>
          <form className='form'>
            <h2 className="form__title">update user</h2>
            {
              listOptions.map((option, index) => (
                <FormItem key={index} onChange = {handleChange} {...option}/>
              ))
            }
            <div className="form__item">
              <label htmlFor="imgProfile" className='form__item__profile'>
                image profile:
                  <img src= {currentUrl} alt="img-profile"  ref={urlProfileRef}/>
                  <Publish className='form__item__icon' htmlFor="imgProfile"/> 
              </label>
              <input 
                type="file" 
                name='imgProfile' 
                id = "imgProfile"  
                style={{display: "none"}}
                required={true}
                onChange = {(e) => {
                  setFile(e.target.files[0])
                  setCurrentUrl(URL.createObjectURL(e.target.files[0]))
                }}
              />
            </div>
            <div className="form__item">
              <label htmlFor="genre">genre:</label>
              <select name="genre" id="genre" onChange={handleChange} ref={genreRef}>
                <option></option>
                <option value='mail'>mail</option>
                <option value='femail'>femail</option>
              </select>
            </div>
            <div className="form__btn">
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
          </form>
      </div>
    </Helmet>
  )
}

export default Register

const FormItem = ({label, name, onChange, errorMessage, formRef, ...inputProps}) => {
  const [focus, setFocus] = useState(true)

  const handleFocus = () => {
    if(name === 'confirmpassword') setFocus(false)
    else setFocus(true)
  }

  return (
    <div className="form__item">
      <label htmlFor={`${name}`}>{label}:</label>
      <input  
        id = {`${name}`} 
        name={name}
        {...inputProps}
        onChange = {name === 'confirmpassword' ? null : onChange}
        focus = {focus.toString()}
        onBlur = {() => setFocus(false)}
        onFocus= {handleFocus}
        ref={formRef}
      />
      <span className='form__error'>{errorMessage}</span>
    </div>
  )
}