import React from 'react'

export const SmallImage = ({image}) => {
  return (
    <div className="bg-[rgba(0,0,0,0.1)] px-2">
    <img className="w-full" src={image} alt="image" />
  </div>
  )
}
