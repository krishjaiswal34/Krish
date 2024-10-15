import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Person from "@mui/icons-material/PersonOutline";
import Cart from "@mui/icons-material/ShoppingCartOutlined";
import { CartIcon } from "../CartIcon";
import { useColorScheme } from "@mui/material";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContext";

export const NavBar = () => {
  const { logedInUser,logOut} = useContext(FirebaseAuthContext);
  const [isProfilePopup,setIsProfilePopup]=useState(false)
  const navigate=useNavigate();

  return (
    <div className="flex justify-between items-center py-4 w-full">
      <NavLink to={"/"} className="logo font-semibold text-3xl cursor-pointer">
        BASKIT
      </NavLink>

      <div className="flex  gap-4 text-lg items-center justify-center ">
        <p>Home</p>
        <p>Shop</p>
        <p>About</p>
        <p>Contact us</p>
        <p>|</p>
        

        <CartIcon />
        {logedInUser ? (
          <div className="relative flex flex-col items-end">
            <div onClick={()=>isProfilePopup?setIsProfilePopup(false):setIsProfilePopup(true)} className="h-[30px] w-[30px] rounded-full flex items-center justify-center font-semibold  bg-[rgba(0,0,0,0.2)] cursor-pointer">
              A
            </div>
            <div className={`profile-popup absolute top-[110%] right-0 z-10 flex flex-col items-end ${!isProfilePopup?'hidden':'visible'} bg-white py-4 px-3 border rounded-md shadow-md`}>
              <h1>{logedInUser.email}</h1>
              <div onClick={logOut} className="flex gap-1 text-red-800 font-semibold cursor-pointer"> Logout</div>
            </div>
          </div>
        ) : (
          <div onClick={()=>navigate('/login')}><Person  className="text-lg cursor-pointer" /></div>
        )}
      </div>
    </div>
  );
};
