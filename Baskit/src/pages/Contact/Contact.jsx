import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Contact.css";
import bannerImage from "../../assets/Images/b1.jpg";
import {
  faEnvelope,
  faLocation,
  faLocationDot,
  faPhone,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import MainHeading from "../../components/MainHeading";
import Banner from "../../components/Banner";

import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
// import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_u1sf8e9",
        "template_s0z1k4c",
        formData,
        "th-AL2lnwhfkPQdfn"
      )
      .then(
        (respone) => {
         
          toast.success("Messae Successfully sent !");
        },
        (error) => {
          console.log("Failed", error);
          toast.error("Message not sent !");
        }
      );

    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center relative ">
      <div className="w-full max-w-[1440px]  ">
        <Banner bannerImage={bannerImage} heading={"CONTACT"} />

        <MainHeading text={"GET IN TOUCH"} />

        <p className="sub-heading">
          We’d love to hear from you! Drop us a message
        </p>

        <div className="w-full  gap-10 mt-[50px]  min-h-[400px] md:flex">
          {/*contact detail*/}

          <div className="contact-details flex flex-col gap-4 md:w-1/3  ">
            {/**phone number */}
            <div className="flex gap-4 justify-start  shadow-lg px-4 py-4 w-full border items-center">
              <div className="h-[40px] w-[40px] flex justify-center bg-[rgba(0,0,0,0.1)] items-center rounded-full">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="flex flex-col gap-1 text-start">
                <h1 className="font-semibold text-lg">Phone Number</h1>
                <p className=" text-gray-600">+91 1122334455</p>
              </div>
            </div>
            {/**Email address */}
            <div className="flex gap-4 justify-start  shadow-lg px-4 py-4 w-full border items-center">
              <div className="h-[40px] w-[40px] flex justify-center bg-[rgba(0,0,0,0.1)] items-center rounded-full">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="flex flex-col gap-1 text-start">
                <h1 className="font-semibold text-lg">Email Address</h1>
                <p className=" text-gray-600">krishjaishwal@gmail.com</p>
              </div>
            </div>
            {/**location */}
            <div className="flex gap-4 justify-start  shadow-lg px-4 py-4 w-full border items-center">
              <div className="h-[40px] w-[40px] flex justify-center bg-[rgba(0,0,0,0.1)] items-center rounded-full">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div className="flex flex-col gap-1 text-start">
                <h1 className="font-semibold text-lg">Location</h1>
                <p className=" text-gray-600">Satna,Madhyapradesh</p>
              </div>
            </div>
          </div>
          {/*--------------contact form----------------- bg-[#008eb11e]*/}
          <div className="contact-form flex-1 border shadow-lg text-start px-8 py-8 mt-5 md:mt-0">
            <h1 className="font-bold text-2xl">Send Message</h1>
            <p className="text-gray-600">
              Your thoughts make a difference! Share your feedback and help us
              grow together.{" "}
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-start items-start"
            >
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full border-b-2 border-black outline-none px-2 py-2 max-w-[400px] mt-7"
                onChange={handleChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                required
                className="w-full border-b-2 border-black outline-none px-2 py-2 max-w-[400px] mt-7"
                onChange={handleChange}
              />
              <textarea
                name="message"
                type="text"
                placeholder="Enter your message"
                required
                className="w-full border-b-2 border-black outline-none px-2 py-2 max-w-[400px] mt-7"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black hover:bg-[rgba(0,0,0,0.8)] text-white"
              >
                SUBMIT
              </button>
            </form>
          </div>

          {/*--------------------*/}
        </div>
      </div>
    </div>
  );
}

export default Contact;
