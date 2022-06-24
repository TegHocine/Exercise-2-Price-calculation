import React from 'react'

import './Title.css'

const Title = ({ title, icon, size = 2 }) => {
  const style = {
    fontSize: size + 'rem'
  }
  return (
    <h2 className='Title' style={style}>
      {title}
      {icon && (
        <span>
          <img src={icon} alt='icon' className='title_icon' />
        </span>
      )}
    </h2>
  )
}

export default Title
