import React, { useState } from "react";
import { ProductExtraIamge } from "../components/ProductExtraIamge";
import image from "../assets/Tshirt.png";
import { ProductSize } from "../components/ProductSize";
export const AddItemsView = () => {
const [thumbnail,setThumbnail]=useState();
const [extraImages,setExtraImages]=useState({});
const [name,setName]=useState();
const [price,setPrice]=useState();
const sizes=new Set()
const [category,setCategory]=useState();
const [subcategory,setSubCategory]=useState();
const [smallDescription,setSmallDescription]=useState();
const [fullDescription,setFullDescription]=useState();
const formData=new formData();
const handleThumbnailChange=(e)=>{
  console.log("Thumbnail changed")
  const image=e.target.files[0]
  setThumbnail(image)

}
const handleExtraImagesChange=(e)=>{

  console.log("extra images changed")

  const image=e.target.files[0]
  const fieldName=e.target.name;
  setExtraImages({...extraImages,[fieldName]:[image]})

}
const handleNameChange=(e)=>{
console.log("Name changed");

const newName=e.target.value;
setName(name)
 
}
const handlePriceChange=(e)=>{
  console.log("price changed");
const newPrice=e.target.value;
setPrice(newPrice)
}
const handleSizeChange=(e)=>{

  const newSize=e.target.innerText;
  console.log("size changed",newSize);
  sizes.add(newSize)

}
const handleCategoryChange=(e)=>{
  console.log("category changed");
const newCategory=e.target.value;
setCategory(newCategory)
}
const handleSubCategoryChange=(e)=>{
  console.log("subcategory changed");
const newSubCatgroy=e.target.value;
setSubCategory(newSubCatgroy)
}
const handleSmallDescriptionChange=(e)=>{
  console.log("small desc  changed");
  const newSmallDescription=e.target.value;
  setSmallDescription(newSmallDescription)
}
const handleFullDescriptionChange=(e)=>{
  console.log("full desc changed")
const newFullDescription=e.target.velue;
setFullDescription(newFullDescription)
}

const handleFormSubmit=(e)=>{


}
  return (
    <form className="py-6 px-10 text-start flex flex-col gap-4">

      {/* product Thumbnail */}
     <div className="flex flex-col gap-2">

     <h1>Upload Thumbnail</h1>
      <ProductExtraIamge  inputChange={handleThumbnailChange} fieldName={'thumbnail'} />
      <h1>Upload some extra images</h1>




      <div className="flex gap-5">
        <ProductExtraIamge inputChange={handleExtraImagesChange} fieldName={'e1'}/>
        <ProductExtraIamge  inputChange={handleExtraImagesChange} fieldName={'e2'}/>
        <ProductExtraIamge inputChange={handleExtraImagesChange} fieldName={'e3'} />
        <ProductExtraIamge inputChange={handleExtraImagesChange}  fieldName={'e4'}/>
      </div>

     </div>
      <div className="flex flex-col gap-2">
        <h1>Product name</h1>
        <input
        onChange={handleNameChange}
          className="w-full px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
          placeholder="Enter product name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1>Small descripton</h1>
        <textarea
        onChange={handleSmallDescriptionChange}
          className="w-full px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
          placeholder="Small descritpion about product"
        />
      </div>
      {/*--catgory , price, subcategory */}
      <div className="w-full flex gap-4">
        <div className="flex flex-col gap-2">
          <h1>Product category</h1>
          <select
          onChange={handleCategoryChange}
            className="flex-1 px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
            placeholder="category"
          >
            <option>Men</option>
            <option>Women</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Sub category</h1>
          <select
          onChange={handleSubCategoryChange}
            className="flex-1  px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
            placeholder="Sub category"
          >
            <option>Shirt</option>
            <option>Pant</option>
            <option>Top</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Product price</h1>
          <input
          onChange={handlePriceChange}
            type="number"
            className="flex-1 px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
            placeholder="Product price"
          />
        </div>
      </div>
      {/*product sizes */}
   <div className="flex flex-col gap-2">
    <h1>Product sizes</h1>
    <div className="flex gap-4">
        <ProductSize  text={"S"}  sizes={sizes}/>
        <ProductSize text={"M"}  sizes={sizes}/>
        <ProductSize text={"L"}  sizes={sizes}/>
        <ProductSize text={"XL"}  sizes={sizes}/>
        <ProductSize text={"XL"} sizes={sizes}/>
      </div>
   </div>
      <div className="flex flex-col gap-2">
        <h1>Full descripton</h1>
        <textarea
        onChange={handleFullDescriptionChange}
          className="w-full px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
          placeholder="Enter product name"
        />
      </div>
      <button type="submit" onClick={handleFormSubmit} className="px-4 py-2 bg-[rgba(0,0,0,1)] text-white">
        ADD
      </button>
    </form>
  );
};
