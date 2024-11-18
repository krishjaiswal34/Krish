import React from 'react'
import StarRating from './StarRating'

const ReviewCard = ({review}) => {
  console.log('review:',review)
  return (
    <div className='w-full  px-4 py-4 rounded-xl flex flex-col text-start shadow-lg border border-black gap-2 '>
<StarRating rating={review?.rating}/>
<p>{review?.comment
}</p>
<h1 className='text-lg font-semibold mt-2'>{review?.name}</h1>
    </div>

  )
}

export default ReviewCard