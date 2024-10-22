import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import "./Contact.css";
import bannerImage from '../../assets/Images/b1.jpg'
import {
  faEnvelope,
  faLocation,
  faLocationDot,
  faPhone,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import MainHeading from "../../components/MainHeading";
import Banner from "../../components/Banner";
import { Button } from "../../components/Button";

// import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
 
e.preventDefault();
    // emailjs
    //   .send(
    //     "service_u1sf8e9",
    //     "template_s0z1k4c",
    //     formData,
    //     "th-AL2lnwhfkPQdfn"
    //   )
    //   .then(
    //     (respone) => {
    //       console.log("SUCCESS !!", respone.status, respone.text);
    //       alert("SUCCESS!!", respone.status, respone.text);
    //     },
    //     (error) => {
    //       console.log("Failed", error);
    //       alert("failed", error);
    //     }
    //   );

    // setFormData({ name: "", email: "", message: "" });
  };

  const handleSocialClick = (social) => {
    if (social === "linkedin") {
      window.open("https://www.linkedin.com/in/anurag-prajapati34/", "_blank");
    } else if (social === "email") {
      window.open("mailto:prajapatianurag73240@gmail.com", "_blank");
    } else if (social === "x") {
      window.open("https://x.com/anurag_x34", "_blank");
    } else if (social === "github") {
      window.open("https://github.com/anurag-prajapati34", "_blank");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center relative ">
      <div className="w-full max-w-[1440px]  ">

        <Banner bannerImage={bannerImage} heading={'CONTACT'}/>
    
     

        <div className="w-full flex gap-10 mt-[100px]  min-h-[400px] max-md:flex-col">
          {/*contact detail*/}
          <div className="contact-details-container flex-1 ">
           <MainHeading text={'GET IN TOUCH'}/>

            <p className="sub-heading">
            We’d love to hear from you! Drop us a message 
            </p>

            <div className="flex flex-col mt-10 gap-6">
              <div className="contact flex  gap-4">
                <div className="contact-icon bg-[#008eb10f]">
                  <FontAwesomeIcon
                    className="text-[#008eb1]"
                    icon={faLocationDot}
                  />
                </div>
                <div className="contact-detail">
                  <h1>Address</h1>
                  <p>Satna , MadhyaPradesh ,India</p>
                </div>
              </div>
              <div className="contact flex  gap-4">
                <div className="contact-icon bg-[#5b00b10f] ">
                  <FontAwesomeIcon className="text-[#5b00b1]" icon={faPhone} />
                </div>
                <div className="contact-detail">
                  <h1>Phone Number</h1>
                  <p>+91 1122334455</p>
                </div>
              </div>
              <div className="contact flex  gap-4">
                <div className="contact-icon bg-[hsla(35,100%,53%,0.08)]">
                  <FontAwesomeIcon
                    className="text-[#ff9b0f]"
                    icon={faEnvelope}
                  />
                </div>
                <div className="contact-detail">
                  <h1>E-mail</h1>
                  <p>abc@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="h-[1px]  mt-10 bg-gray-400"></div>

            <h1 className="mt-10 font-bold text-[20px]">Follow Us:</h1>
            <div className="social-accounts flex gap-6 mt-4">
              <div onClick={()=>handleSocialClick('linkedin')} 
              
              className="social-ac-logo bg-[#008eb10f] hover:bg-[rgba(0,142,177,0.2)] transition-colors">
                <FontAwesomeIcon  className="text-[#008eb1]" icon={faLinkedin} />
              </div>
              <div onClick={()=>handleSocialClick('github')} className="social-ac-logo bg-[#5b00b10f] hover:bg-[rgba(91,0,177,0.2)]">
                <FontAwesomeIcon  className="text-[#5b00b1]" icon={faGithub} />
              </div>
              <div onClick={()=>handleSocialClick('x')} className="social-ac-logo bg-gray-100 hover:bg-gray-300">
                <FontAwesomeIcon className="text-black" icon={faXTwitter} />
              </div>
            </div>
          </div>
          {/*--------------contact form----------------- bg-[#008eb11e]*/}
          <form onSubmit={handleSubmit} className="contact-form flex-1    border-2 border-[rgba(0,0,0,0.4)] flex flex-col gap-10 px-6 py-4  shadow-black shadow-sm ">
            <MainHeading text={"SEND A MESSAGE/FEEDBACK 💌"} />
            <input name="name" 
            onChange={handleChange}
            type="text"
            required
            value={formData.name}
            placeholder="Name"></input>
            <input name="email"
            onChange={handleChange}
            type="email"
            id='email'
            value={formData.email}
            
            placeholder="Email "></input>
            <textarea
            name="message"
            id="message"
            type='tesxt'
            value={formData.message}
            onChange={handleChange}
             rows={1} placeholder="Message"></textarea>
             <div className="w-full flex items-center justify-center ">
              <Button text={'SEND'} />
             </div>
          </form>
          {/*--------------------*/}
        </div>


      </div>
 
    </div>
  );
}

export default Contact;
