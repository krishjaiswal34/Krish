import React from "react";
import {NavLink} from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="min-h-[100vh] border-r-2 w-1/5 py-6 flex flex-col gap-5">
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
