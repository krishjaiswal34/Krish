import React, { useState } from "react";

const SizeSelectOption = ({ text, setSizeToBuy, sizeToBuy }) => {
  const [isSelected, setIsSelected] = useState(false);
  console.log("SizeToBuy:", sizeToBuy);
  const handleSizeSelect = () => {
    try {
      if (sizeToBuy == text) {
        setSizeToBuy("M");
      } else {
        setSizeToBuy(text);
      }
    } catch (err) {
      console.log("Error selecting size:", err);
      alert("Error selecting size");
    }
  };

  return (
    <div
      onClick={handleSizeSelect}
      className={`px-4 py-2 cursor-pointer border-[rgba(0,0,0,0.07)] border-2 bg-[rgba(0,0,0,0.05)] ${
        sizeToBuy === text ? "border-[rgba(0,0,0)]" : ""
      }`}
    >
      {text}
    </div>
  );
};

export default SizeSelectOption;
