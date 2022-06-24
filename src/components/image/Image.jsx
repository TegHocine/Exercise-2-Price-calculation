import React from 'react'

import './Image.css'

const Image = ({ img, rounded }) => {
  return (
    <>
      <img
        src={img}
        alt='product'
        className={`Image ${rounded ? 'roundedImg' : ''}`}
      />
    </>
  )
}

export default Image
