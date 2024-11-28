import React from "react";
import {NavLink} from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="sm:min-h-[100vh] sm:border-r-2 sm:w-1/5 py-6 flex sm:flex-col gap-5 flex-wrap">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `w-full border-2 px-4 py-2 flex justify-center items-center cursor-pointer ${
            isActive ? "bg-[rgba(0,0,0,0.2)]" : ""
          }`
        }
      >
        Add product
      </NavLink>

      <NavLink
        to="listedProducts"
        className={({ isActive }) =>
        `w-full border-2 px-4 py-2 flex justify-center items-center cursor-pointer ${
          isActive ? "bg-[rgba(0,0,0,0.2)]" : ""
        }`
      }
      >
        Listed products
      </NavLink>
      <NavLink
        to="orders"
        className={({ isActive }) =>
        `w-full border-2 px-4 py-2 flex justify-center items-center cursor-pointer ${
          isActive ? "bg-[rgba(0,0,0,0.2)]" : ""
        }`
      }
      >
        Orders
      </NavLink>
    </div>
  );
};

export default SideBar;
