import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../contexts/ProductContext';
import './FilterBar.css'

const FilterBar = () => {

    const { products, setShopProducts, } = useContext(ProductContext);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [priceRange, setPriceRange] = useState(10000);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const availableCategories = [

        'Shirts',

        'T-Shirts & Polos',
        'Hoodies & Sweatshirts',
        'Jackets & Coats',
        'Jeans',
        'Pants & Chinos',
        'Shorts',
        'Tops & T-Shirts',
        'Dresses',
        'Jeans & Pants',
        'Skirts',
        'Sweaters & Cardigans',

    ]

    const handleCategoriesCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCategories((prev) => [...prev, value]);
        } else {
            const newCategories = categories.filter((category) => category !== value);
            setCategories(newCategories);
        }
    }

    const handleSubCategoriesCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSubCategories((prev) => [...prev, value]);
        } else {
            const newSubCategories = subCategories.filter((subCategory) => subCategory !== value);
            setSubCategories(newSubCategories);
        }
    }

    const handleBrandsCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setBrands((prev) => [...prev, value]);
        } else {
            const newBrands = brands.filter((brand) => brand !== value);
            setBrands(newBrands);
        }
    }


    useEffect(() => {

        


        const matchesCategories = categories.length > 0 ? products?.filter((product) => categories.includes(product?.category?.toLowerCase())) : products;

        const matchesSubCategories = subCategories.length > 0 ? matchesCategories.filter((product) => subCategories.includes(product?.subCategory?.toLowerCase())) : matchesCategories;
        
        const matchesBrands = brands.length > 0 ? matchesSubCategories.filter((product) => brands.includes(product?.brand?.toLowerCase())) : matchesSubCategories;

        const matchesPrice = priceRange ? matchesBrands?.filter((product) => priceRange >= parseInt(product?.price)) : matchesBrands;

        
        setFilteredProducts(matchesPrice)
        setShopProducts(matchesPrice);



    }, [categories, subCategories, brands, priceRange])


    return (
        <div className='sm:w-[300px] w-[200px]  gap-3 h-full py-8 flex flex-col items-start pr-4'>
            {/* <div className='flex justify-between items-center w-full'><h1 className='text-xl font-semibold text-[var(--primary-color)]'>Filter products</h1>

                
            </div> */}
            {/**for (categories) */}
            <div>
               
                <div className='flex flex-col gap-1'>


                    <label className='text-lg flex gap-2 items-center'>
                        <input onChange={handleCategoriesCheckboxChange} className='h-[15px] w-[15px]' type='checkbox' value={'men'} />
                        Men
                    </label>
                    <label className='text-lg flex gap-2 items-center'>
                        <input onChange={handleCategoriesCheckboxChange} className='h-[15px] w-[15px]' type='checkbox' value={'women'} />
                        Women
                    </label>
                </div>

            </div>
            {/** categories / sub categories*/}
            <div>
                <h1 className='text-lg font-semibold text-start'>Filter by category</h1>
                <div className='flex flex-col gap-1'>


                    {
                        availableCategories.map((ctg)=><label className='text-lg flex gap-2 items-center text-start'>
                        <input onChange={handleSubCategoriesCheckboxChange} className='h-[15px] w-[15px]' type='checkbox' value={ctg.toLowerCase()} />
                        {ctg}
                    </label>)
                    }
                    
                </div>
            </div>
           
            {/**price range */}
            <hr />

            <div className='text-start w-full'>
                <h1 className='text-lg font-semibold'>Price-( ₹{priceRange})</h1>
                <div className='flex flex-col gap-1 w-full'>


                    <label  className='slider-container'>

                        <input onChange={(e) => setPriceRange(e.target.value)} min={0} max={69999} type='range' name='pricerange' className=' slider' value={priceRange} />
                      
                       
                    </label>


                </div>
            </div>
        </div>
    )
}

export default FilterBar