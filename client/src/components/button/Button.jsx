import './button.scss'

const Button = ({children, type, onClick, disabled}) => {
  return (
    <button 
      className={`btn ${type === 'sm' ? 'sm' : ''}`}
      onClick = {onClick || null}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button