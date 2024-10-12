import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import MainHeading from "../../components/MainHeading";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContext";
import {toast,ToastContainer} from 'react-toastify'

export const LoginPage = () => {
  const navigate = useNavigate();
  const {loginUserWithEmailAndPassword}=useContext(FirebaseAuthContext)
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const successNotify=()=>toast.success("Login successful");


  const handleLoginBtnclick=async(e)=>{
    e.preventDefault();
const user=await loginUserWithEmailAndPassword(email,password)
if(user){
  successNotify();
}

  }

  return (
    <div className="flex min-h-[100vh] max-w-[1280px] flex-col items-center justify-center">
      <ToastContainer/>
      <MainHeading text={"LOGIN"} />

      <div class="form text-start">
        <div class="flex-column">
          <label>Email </label>
        </div>
        <div class="inputForm">
          {/* image */}
          <input onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your Email" class="input" type="text" />
        </div>

        <div class="flex-column">
          <label>Password </label>
        </div>
        <div class="inputForm">
          {/* image       */}
          <input onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your Password"
            class="input"
            type="password"
          />
        </div>

        <div class="flex-row">
          <div>
            <input type="radio" />
            <label>Remember me </label>
          </div>
          <span class="span">Forgot password?</span>
        </div>
        <button onClick={handleLoginBtnclick} class="button-submit">Log In</button>
        <p class="p">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} class="span">
            Sign Up
          </span>
        </p>
        <p class="p line">Or With</p>

        <div class="flex-row">
          <button class="btn google">
            {/* image */}
            Google
          </button>
          <button class="btn apple">
            {/* image */}
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};
