import React from "react";
import "./Offerings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faHandsHelping,
  faHeadset,
  faHeart,
  faMask,
  faStar,
  faTruck,
  faUndo,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

const Offerings = () => {
  return (
    <div className="offerings-container w-full max-w-[1440px] px-2 lg:px-[20px]">
      <div className="offering bg-[#008eb10f]">
        <FontAwesomeIcon className="icon text-[#008eb1]" icon={faHeadset} />
        <h1>24/7 Customer Support</h1>
        <p>Our team is always here to assist you with any inquiries or support you need!</p>
      </div>

      <div className="offering  bg-[#5b00b10f] ">
        <FontAwesomeIcon className="icon text-[#5b00b1]" icon={faTruck} />
        <h1>Free Shipping on Orders</h1>
        <p>
        Enjoy complimentary shipping on all orders, no minimum required!
        </p>
      </div>
      <div className="offering  bg-[hsla(35,100%,53%,0.08)]">
        <FontAwesomeIcon className="icon text-[#ff9b0f]" icon={faStar} />
        <h1>High-Quality Products</h1>
        <p>
        We curate only the finest materials and craftsmanship for your satisfaction!
        </p>
      </div>
      <div className="offering  bg-[#003bb10f]">
        <FontAwesomeIcon className="icon text-[#003bb1]" icon={faUndo} />
        <h1>Hassle-Free Returns</h1>
        <p>
        Not completely satisfied? Enjoy easy returns within 30 days of purchase!
        </p>
      </div>
    </div>
  );
};

export default Offerings;
