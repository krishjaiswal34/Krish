import React from 'react'


const Banner = ({bannerImage,heading}) => {
  return (
    <div className='h-[200px] w-full border-[1px] border-black flex text-center relative' >
<img className='object-cover w-full' src={bannerImage} />

<div className=' bg-gradient-to-r from-[rgba(0,0,0,0.6)]  to-[rgba(0,0,0,0.8)] opacity-[80%] absolute h-full w-full flex items-center justify-center'>
<h1 className='text-4xl font-bold absolute text-white '>#{heading}</h1>
</div>

</div>
  )
}

export default Banner