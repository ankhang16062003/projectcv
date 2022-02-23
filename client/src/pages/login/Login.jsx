import './login.scss'
import {useState, useContext} from 'react'
import Button from '../../components/button/Button'
import {Link} from 'react-router-dom'
import bgLogin from '../../assets/img/bg-login.jpg'
import Helmet from '../../components/helmets/Helmet'
import {AuthContext} from '../../context/authContext/AuthContext'
import {login} from '../../context/authContext/apiCalls'


const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const {dispatch, isFetching} = useContext(AuthContext)

  const listOptions = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'vuongankhang1606@gmail.com',
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true,
    },
  ]

  const handleChange = (e) => {
    const value = e.target.value
    setValues({...values, [e.target.name]: value})
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login(dispatch, values)
  }

  return (
    <Helmet title='Login'>
      <div className='login bg-img' style={{backgroundImage: `url(${bgLogin})`}}>
          <div className="login__register">
            <Link to='/register'>
              <Button>register</Button>
            </Link>
          </div>
          <form className='form'>
            <h2 className="form__title">login</h2>
            {
              listOptions.map((option, index) => (
                <FormItem key={index} onChange = {handleChange} {...option}/>
              ))
            }
            <div className="form__btn">
              <Button onClick = {handleLogin} disabled={isFetching}>login</Button>
            </div>
          </form>
      </div>
    </Helmet>
  )
}

export default Login

const FormItem = ({label, name, onChange, errorMessage, ...inputProps}) => {
  const [focus, setFocus] = useState(true)

  return (
    <div className="form__item">
      <label htmlFor={`${name}`}>{label}:</label>
      <input  
        id = {`${name}`} 
        name={name}
        {...inputProps}
        onChange = {onChange}
        focus = {focus.toString()}
        onBlur = {() => setFocus(false)}
        onFocus= {() => setFocus(true)}
      />
      <span className='form__error'>{errorMessage}</span>
    </div>
  )
}