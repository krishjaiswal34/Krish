import React from 'react'

const MainHeading = ({text}) => {
  return (
   
    <div className=' flex gap-1 justify-center items-center text-3xl font-semibold mt-10 mb-3'>
        
        {text}
<div className='w-[50px] h-[2px] bg-[rgba(0,0,0,0.4)]'></div>

    </div>
   
  )
}

export default MainHeading