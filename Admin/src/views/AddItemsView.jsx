import React, { useEffect, useState } from "react";
import { ProductExtraIamge } from "../components/ProductExtraIamge";

import { ProductSize } from "../components/ProductSize";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomCheckbox from "../components/CustomCheckBox";

export const AddItemsView = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [thumbnail, setThumbnail] = useState();
  const [extraImages, setExtraImages] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubCategory] = useState("Shirt");
  const [smallDescription, setSmallDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isAdding, setIsAdding] = useState(false)

  const handleThumbnailChange = (e) => {
   
    const image = e.target.files[0];
    setThumbnail(image);
  };
  const handleExtraImagesChange = (e) => {
   

    const image = e.target.files[0];
    const fieldName = e.target.name;
    setExtraImages({ ...extraImages, [fieldName]: image });
  };
  const handleNameChange = (e) => {
    

    const newName = e.target.value;
    setName(newName);
  };
  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);

    setPrice(newPrice);
  };
  const handleSizeChange = (e) => {
    const newSize = e.target.innerText;
    
    setSizes([...sizes, newSize]);
  };
  const handleCategoryChange = (e) => {
   
    const newCategory = e.target.value;
    setCategory(newCategory);
  };
  const handleSubCategoryChange = (e) => {
    
    const newSubCatgroy = e.target.value;
    setSubCategory(newSubCatgroy);
  };
  const handleSmallDescriptionChange = (e) => {
    
    const newSmallDescription = e.target.value;
    setSmallDescription(newSmallDescription);
  };
  const handleFullDescriptionChange = (e) => {

    const newFullDescription = e.target.value;
    setFullDescription(newFullDescription);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !price ||
      !smallDescription ||
      !fullDescription ||
      !sizes ||
      !category ||
      !subcategory ||
      !thumbnail || !Object.keys(extraImages).length>1
    ) {
  
      toast.error("Fill all fields",{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
      return;
    }
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("smallDescription", smallDescription);
    formData.append("fullDescription", fullDescription);
    formData.append("isFeatured", isFeatured);
    sizes.forEach((size) => {
      formData.append("sizes[]", size);
    });
    formData.append("thumbnail", thumbnail);
    formData.append("category", category);
    formData.append("subCategory", subcategory);

 
    const id=toast.loading("Product adding...",{ style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    for (const key in extraImages) {
      if (extraImages[key]) {
        formData.append("extraImages", extraImages[key]);
      }
    }

    // **Logging FormData**
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    //sending data to server
    setIsAdding(true);
    fetch(`${SERVER_URL}/upload`, {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.ok) {
          const responeData = await response.json();
          
          if (responeData) {
            setIsAdding(false)
            toast.update(id,{ render: "Product listed successfully",
            type: "success", 
            isLoading: false, 
            autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
          }
        }
      })
      .catch((err) => {
        setIsAdding(false)
      
        toast.update(id,{ render: "Error listing product",
    type: "error", 
    isLoading: false, 
    autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
      });
  };
  useEffect(() => {
    console.log("size from adddITme com:", sizes);
  }, [sizes]);

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="py-6 px-10 text-start flex flex-col gap-4 "
      >
        {/* product Thumbnail */}
        <div className="flex flex-col gap-2">
          <h1>Upload Thumbnail</h1>
          <ProductExtraIamge
            inputChange={handleThumbnailChange}
            fieldName={"thumbnail"}
          />
          <h1>Upload some extra images</h1>

          <div className="flex gap-5 flex-wrap">
            <ProductExtraIamge
              inputChange={handleExtraImagesChange}
              fieldName={"e1"}
            />
            <ProductExtraIamge
              inputChange={handleExtraImagesChange}
              fieldName={"e2"}
            />
            <ProductExtraIamge
              inputChange={handleExtraImagesChange}
              fieldName={"e3"}
            />
            <ProductExtraIamge
              inputChange={handleExtraImagesChange}
              fieldName={"e4"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <h1>Product name</h1>
          <input
            name="name"
            required
            onChange={handleNameChange}
            className="w-full px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
            placeholder="Enter product name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1>Small descripton</h1>
          <textarea
            name="smallDescription"
            required
            onChange={handleSmallDescriptionChange}
            className="w-full px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
            placeholder="Small descritpion about product"
          />
        </div>
        {/*--catgory , price, subcategory */}
        <div className="w-full flex gap-4 flex-wrap">
          <div className="flex flex-col gap-2">
            <h1>Product category</h1>
            <select
              name="category"
              required
              value={"Men"}
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
              name="subCategory"
              required
              onChange={handleSubCategoryChange}
              className="flex-1  px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
              placeholder="Sub category"
            >
              <option value="Shirts">Shirts</option>
              <option value="T-Shirts & Polos">T-Shirts & Polos</option>
              <option value="Hoodies & Sweatshirts">Hoodies & Sweatshirts</option>
              <option value="Jackets & Coats">Jackets & Coats</option>
              <option value="Jeans">Jeans</option>
              <option value="Pants & Chinos">Pants & Chinos</option>
              <option value="Shorts">Shorts</option>
              <option value="Tops & T-Shirts">Tops & T-Shirts</option>
              <option value="Dresses">Dresses</option>
              <option value="Jeans & Pants">Jeans & Pants</option>
              <option value="Skirts">Skirts</option>
              <option value="Sweaters & Cardigans">Sweaters & Cardigans</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Product price</h1>
            <input
              name="price"
              required
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
          <div className="flex gap-4 flex-wrap">
            <ProductSize text={"S"} sizes={sizes} setSizes={setSizes} />
            <ProductSize text={"M"} sizes={sizes} setSizes={setSizes} />
            <ProductSize text={"L"} sizes={sizes} setSizes={setSizes} />
            <ProductSize text={"XL"} sizes={sizes} setSizes={setSizes} />
            <ProductSize text={"XXL"} sizes={sizes} setSizes={setSizes} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Full descripton</h1>
          <textarea
            required
            name="fullDescription"
            onChange={handleFullDescriptionChange}
            className="w-full px-2 py-1 border-2 border-[rgba(0,0,0,0.3)] outline-none"
            placeholder="Enter product name"
          />
        </div>
        <CustomCheckbox setIsFeatured={setIsFeatured} />
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="px-4 py-2 bg-[rgba(0,0,0,1)] text-white"
        >
          ADD
        </button>
      </form>
      {/* <div className={`fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] flex justify-center items-center ${isAdding ? 'visible' : 'hidden'}`}>
        <Loader />
      </div> */}

    </>
  );
};
