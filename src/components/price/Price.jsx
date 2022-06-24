import React from 'react'

import './Price.css'

const Price = ({ price, title, oldPrice }) => {
  return (
    <div className={`Price ${oldPrice ? 'old-price' : ''}`}>
      {title ? <h3 className='price_title'>{title}</h3> : ''}
      <p>£{price?.toFixed(2)}</p>
    </div>
  )
}

export default Price
