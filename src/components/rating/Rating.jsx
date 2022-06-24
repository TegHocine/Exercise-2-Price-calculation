import { useState } from 'react'
import emptyStart from '../../assets/rating/emptyStart.png'
import fullStart from '../../assets/rating/fullStart.png'

import './Rating.css'

const Rating = () => {
  const [currentValue, setCurrentValue] = useState(0)
  const [hoverValue, setHoverValue] = useState(undefined)
  const stars = Array(5).fill(0)

  const handleClick = (value) => {
    setCurrentValue(value)
  }

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue)
  }

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  return (
    <div className='Rating'>
      {stars.map((_, index) => (
        <img
          className='rating_icon'
          src={(hoverValue || currentValue) > index ? fullStart : emptyStart}
          alt='rating icon'
          key={index}
          onClick={() => handleClick(index + 1)}
          onMouseOver={() => handleMouseOver(index + 1)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  )
}

export default Rating
