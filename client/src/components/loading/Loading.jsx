import './loading.scss'

const Loading = ({bgColor}) => {
  return (
    <div className='wrapperLoader' style={{background: bgColor ? `${bgColor}` : 'unset'}}>
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading