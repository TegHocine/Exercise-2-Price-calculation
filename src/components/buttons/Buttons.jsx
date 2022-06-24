import React from 'react'

import './Buttons.css'

const Buttons = ({ onClick, type }) => {
  const className =
    type === 'increment' || type === 'decrement' ? 'counter_btn' : 'default_btn'
  const title =
    type === 'increment' ? '+' : type === 'decrement' ? '-' : 'add to cart'
  return (
    <button className={`Buttons ${className}`} onClick={() => onClick()}>
      {title.toUpperCase()}
    </button>
  )
}

export default Buttons
