import React from 'react'

function Card({ cardImage, className = "" }) {
  return (
    <div className={`card  sm:w-9 lg:w-20 `}>
      <img src={cardImage} alt='cardImage' className={`${className} w-10 md:w-7 lg:w-10`} />
    </div>
  )
}

export default Card
