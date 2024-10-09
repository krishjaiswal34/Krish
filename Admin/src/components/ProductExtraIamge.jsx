import React, { useState } from 'react'

export const ProductExtraIamge = ({inputChange,fieldName}) => {
  const [selectedImage,setSelectedImage]=useState();
  const handleImageChange=(e)=>{
    const image=e.target.files[0]
    console.log("image :",image)
    setSelectedImage(image)
  }
  return (
    <div className='w-[100px] h-[130px] bg-[rgba(0,0,0,0.1)] flex justify-center items-center px-2 text-xl text-[rgba(0,0,0,0.6)] cursor-pointer relative '>
      <input name={fieldName} onChange={(e)=>{handleImageChange(e),inputChange(e)}
      }className='absolute h-full w-full opacity-0 z-40' type='file' />

   

      {
       selectedImage? <img  className='h-full' src={URL.createObjectURL(selectedImage)} alt='selected-image'/>:   <i class="fa-regular fa-image  text-[rgba(0,0,0,0.5)]"></i>
      }

    </div>
  )
}
