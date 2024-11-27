import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Person from "@mui/icons-material/PersonOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { CartIcon } from "../CartIcon";

import { useContext } from "react";

import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContext";
import "./NavBar.css";
import MenuSideBar from "../MenuSideBar";

export const NavBar = () => {
  const { logedInUser, logOut } = useContext(FirebaseAuthContext);
  const [isProfilePopup, setIsProfilePopup] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenuBarToggle = () => {
    if (isMenu) {
      setIsMenu(false);
    } else {
      setIsMenu(true);
    }
  };

  return (
    <div className="flex justify-between items-center py-4 w-full border-b-2">
      <MenuSideBar isMenu={isMenu} handleMenuBarToggle={handleMenuBarToggle} />
      <NavLink to={"/"} className="company-logo font-semibold text-4xl cursor-pointer">
        Style Haven
      </NavLink>

      <div className="flex  gap-4 text-lg items-center ">
        {/*nav options*/}
        <div className="flex nav-options gap-4 text-lg items-center justify-center ">
          <NavLink
            to={"/"}
            className="font-semibold nav-options-hover-animation "
          >
            Home
          </NavLink>
          <NavLink
            to={"shop"}
            className="font-semibold nav-options-hover-animation "
          >
            Shop
          </NavLink>
          <NavLink
            to={"user-orders"}
            className="font-semibold nav-options-hover-animation "
          >
            Orders
          </NavLink>
          {/* <p className="font-semibold nav-options-hover-animation ">About</p> */}
          <NavLink
            className="font-semibold nav-options-hover-animation "
            to={"contact-us"}
          >
            Contact us
          </NavLink>
          <NavLink
            className="font-semibold nav-options-hover-animation "
            to={"about-us"}
          >
            About us
          </NavLink>
          <p>|</p>
        </div>

        <CartIcon />
        {logedInUser ? (
          <div className="relative flex flex-col items-end">
            <div
              onClick={() =>
                isProfilePopup
                  ? setIsProfilePopup(false)
                  : setIsProfilePopup(true)
              }
              className="h-[30px] w-[30px] rounded-full flex items-center justify-center font-semibold  bg-[rgba(0,0,0,0.2)] cursor-pointer"
            >
              {logedInUser?.email[0]}
            </div>
            <div
              className={`profile-popup absolute top-[110%] right-0 z-10 flex flex-col items-end ${
                !isProfilePopup ? "hidden" : "visible"
              } bg-white py-4 px-3 border rounded-md shadow-md`}
            >
              <h1>{logedInUser.email}</h1>
              <div
                onClick={logOut}
                className="flex gap-1 text-red-800 font-semibold cursor-pointer"
              >
                {" "}
                Logout
              </div>
            </div>
          </div>
        ) : (
          <div onClick={() => navigate("/login")}>
            <Person className="text-lg cursor-pointer" />
          </div>
        )}
        <FontAwesomeIcon
          icon={faBars}
          className="cursor-pointer menu-bar-icon"
          onClick={handleMenuBarToggle}
        />
      </div>
    </div>
  );
};
