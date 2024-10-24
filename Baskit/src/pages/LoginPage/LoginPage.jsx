import React, { useContext, useEffect, useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import MainHeading from "../../components/MainHeading";
import { FirebaseAuthContext } from "../../contexts/FirebaseAuthContext";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUserWithEmailAndPassword,logedInUser } = useContext(FirebaseAuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const successNotify = () => toast.success("Login successful");
  const warnNotify = () => toast.error("Wrong Email or password");

  const handleLoginBtnclick = async (e) => {
    e.preventDefault();

    const user = await loginUserWithEmailAndPassword(email, password);
    if (user) {
      successNotify();
    } else {
      warnNotify();
    }
  };

  useEffect(()=>{
    if(logedInUser){
      navigate('/')
    }
  },[logedInUser])
  return (
    <div className="flex min-h-[100vh] max-w-[1280px] flex-col items-center justify-center">
      <ToastContainer />
      <MainHeading text={"LOGIN"} />
      <form onSubmit={handleLoginBtnclick} class="form text-start">
        <div class="flex-column">
          <label>Email </label>
        </div>
        <div class="inputForm">
          {/* image */}
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            class="input"
            type="text"
          />
        </div>

        <div class="flex-column">
          <label>Password </label>
        </div>
        <div class="inputForm">
          {/* image       */}
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            class="input"
            type="password"
          />
        </div>

        <div class="flex-row">
          <div>
            <input required type="radio" />
            <label>Remember me </label>
          </div>
          <span class="span">Forgot password?</span>
        </div>
        <button type="submit" class="button-submit">
          Login{" "}
        </button>
        <p class="p">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} class="span">
            Sign Up
          </span>
        </p>

      
      </form>
    </div>
  );
};
