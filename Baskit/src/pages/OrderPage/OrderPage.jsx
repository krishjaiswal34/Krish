import React, { useContext, useState } from "react";
import MainHeading from "../../components/MainHeading";
import { toast } from "react-toastify";
import { json, useLocation } from "react-router-dom";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContext";

const OrderPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const { product,quantityToBuy,sizeToBuy } = useLocation().state;
  const { logedInUser } = useContext(FirebaseAuthContext);
  console.log("ordered product:", product);

  //store form data
  const [formData, setFormData] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "Card", // default to card
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const productQnty =  quantityToBuy
  const productPrice = parseInt(product.price);
  const shippingPrice = 15;
  const tax = 8.02;
  const subTotal=productQnty*productPrice;
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle form submission (validation and sending data to backend)
  const handlePlaceOrder = () => {
    // Check if all fields are filled
    console.log("formdat :", formData);
    const {
      name,
      address1,
      city,
      state,
      zip,
      cardName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
    } = formData;

    if (
      name ||
      address1 ||
      city ||
      state ||
      zip ||
      cardName ||
      cardNumber ||
      expiryMonth ||
      cvv
    ) {
      try {
        fetch("http://localhost:8000/placeOrder", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            "userAuthId": logedInUser.uid,
            "shipingInfo": formData,
            "product":{...product,quantityToBuy,sizeToBuy},
          }),
        }).then(async (response) => {
          if (response.ok) {
            const responseData =await response.json();
            console.log("response data after placing order:", responseData);
            toast.success("Order placed successfully");
          } else {
            toast.error("Error placing order");
          }
        }).catch((err)=>{
          console.log("error placeorder:",err)
        })
      } catch (error) {
        toast.error("Unexpected error !");
      }
    }else{
      toast.error("Please fill all the fields")
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 justify-center items-center  p-6 text-start">
      <MainHeading text={"ORDER"} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">Name</label>
              <input
                name="name"
                type="text"
                className="w-full border-gray-300 border p-2 rounded"
                placeholder="First & Last Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-semibold">
                Address 1
              </label>
              <input
                name="address1"
                type="text"
                className="w-full border-gray-300 border p-2 rounded"
                placeholder="421, Dubai Main St"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-semibold">
                Address 2
              </label>
              <input
                name="address2"
                type="text"
                className="w-full border-gray-300 border p-2 rounded"
                placeholder="Apartment, suite, etc."
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">City</label>
              <input
                name="city"
                type="text"
                className="w-full border-gray-300 border p-2 rounded"
                placeholder="City"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">State</label>
              <select
                name="state"
                className="w-full border-gray-300 border p-2 rounded"
                onChange={handleInputChange}
              >
                <option value="">Select state</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold">Zip</label>
              <input
                name="zip"
                type="text"
                className="w-full border-gray-300 border p-2 rounded"
                placeholder="Zip code"
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">
            <div className="flex justify-between">
              <span>{product.name}</span>
              <span>${product.price}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Quantity</span>
              <span>{productQnty}</span>
            </div>
            <div className="flex justify-between ">
              <span>subtotal</span>
              <span>${subTotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Shipping</span>
              <span>${shippingPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tax</span>
              <span>${tax}</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${subTotal + shippingPrice + tax}</span>
          </div>
          <button
            onClick={()=>handlePlaceOrder()}
            className="mt-4 w-full bg-[rgba(0,0,0)] text-white py-2 rounded hover:bg-[rgba(0,0,0,0.8)]"
          >
            Place Order
          </button>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <div className="flex gap-4 mb-4">
            <button
              className={`w-1/3 border p-2 rounded ${
                paymentMethod === "Card"
                  ? "border-[rgba(0,0,0)]"
                  : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("Card")}
            >
              Card
            </button>
            <button
              className={`w-1/3 border p-2 rounded ${
                paymentMethod === "Wallet"
                  ? "border-[rgba(0,0,0)]"
                  : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("Wallet")}
            >
              Wallet
            </button>
            <button
              className={`w-1/3 border p-2 rounded ${
                paymentMethod === "COD"
                  ? "border-[rgba(0,0,0)]"
                  : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod("COD")}
            >
              COD
            </button>
          </div>
          {paymentMethod === "Card" && (
            <form className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-semibold">
                  Name on Card
                </label>
                <input
                  name="cardName"
                  type="text"
                  className="w-full border-gray-300 border p-2 rounded"
                  placeholder="First & Last Name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-semibold">
                  Card Number
                </label>
                <input
                  name="cardNumber"
                  type="text"
                  className="w-full border-gray-300 border p-2 rounded"
                  placeholder="0000 0000 0000 0000"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  Expiry
                </label>
                <input
                  name="expiryMonth"
                  type="text"
                  className="w-full border-gray-300 border p-2 rounded"
                  placeholder="MM"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">CVV</label>
                <input
                  name="cvv"
                  type="text"
                  className="w-full border-gray-300 border p-2 rounded"
                  placeholder="CVV"
                  onChange={handleInputChange}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
