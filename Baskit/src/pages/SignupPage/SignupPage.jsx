import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainHeading from '../../components/MainHeading';
import {toast,ToastContainer} from 'react-toastify'
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContext';

export const SignupPage = () => {

  const navigate=useNavigate();

  const {registerUserWithEmailAndPassword}=useContext(FirebaseAuthContext)
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const successNotify=()=>toast.success("Signup successful");


  const handleSignUpBtnclick=async(e)=>{
    e.preventDefault();
const user=await registerUserWithEmailAndPassword(email,password)
if(user){
  successNotify();
}

  }
  return (
    <div className='flex min-h-[100vh] max-w-[1280px] flex-col items-center justify-center'>
<ToastContainer/>
<MainHeading text={"SIGN UP"}/>
<div class="form text-start">

<div className='flex gap-2 text-start'>

  
<div>
<div class="flex-column">

  
<label>First name </label>

</div>
<div class="inputForm">
  {/* image */}
  <input onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter  first name" class="input" type="text"/>
  
</div>
</div>

<div>
  
<div class="flex-column">
<label>Last name </label></div>
<div class="inputForm">
  {/* image */}
  <input onChange={(e)=>setLastName(e.target.value)} placeholder="Enter  last name" class="input" type="text"/>
  
</div>
</div>
</div>



    <div class="flex-column">
      <label>Email </label></div>
      <div class="inputForm">
        {/* image */}
        <input onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your Email" class="input" type="text"/>
        
      </div>
    
    <div class="flex-column">
      <label>Password </label></div>
      <div class="inputForm">
      {/* image       */}
        <input onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your Password" class="input" type="password"/>
      </div>
    
    <div class="flex-row">
      <div>
      <input type="radio"/>
      <label>Remember me </label>
      </div>
      <span class="span">Forgot password?</span>
    </div>
    <button onClick={handleSignUpBtnclick} class="button-submit">Sign Up</button>
    <p class="p">Don't have an account? <span onClick={()=>navigate('/login')} class="span">Sign Up</span>

    </p><p class="p line">Or With</p>

    <div class="flex-row">
      <button class="btn google">
{/* image */}
   
        Google 
        
      </button><button class="btn apple">
{/* image */}

        Apple 
        
</button></div></div>


    </div>
  )
}
