import { firebaseApp } from "../utils/FirebaseApp";
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {toast} from 'react-toastify'

const firebaseAuth = getAuth(firebaseApp);

const FirebaseAuthContext = createContext();

const FirebaseAuthContextProvider = ({ children }) => {
  const [logedInUser, setLogedInUser] = useState(null);

  const registerUserWithEmailAndPassword = async (email, password) => {
    const id=toast.loading("Registering...",{ style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
        .then(async (usr) => {
          const { uid } = usr.user;
         
          if(user){
            toast.update(id,{ render: "Registered successfully...",
            type: "error", 
            isLoading: false, 
            autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
          }
        
        })
        .catch((error) => {console.log("Error register user:", error);
       
        toast.update(id,{ render: "Invalid input",
        type: "error", 
        isLoading: false, 
        autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
      });
    } catch (error) {
      
      toast.error("Error registering user !");
    }
  };

  const loginUserWithEmailAndPassword = async (email, password) => {
    const id=toast.loading("loging in...",{ style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    try {
      const user = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
        .then((user) => {
       
          if(user){
            toast.update(id,{ render: "Logedin successfully",
            type: "success", 
            isLoading: false, 
            autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
          }
        })
        .catch((error) => {
          console.log("Error login user:", error);
          
         
        });
    } catch (error) {
      
      toast.update(id,{ render: "wrong email or password",
      type: "error", 
      isLoading: false, 
      autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    }
  };
  const logOut=async()=>{
    const id=toast.loading("loging out...",{ style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    await signOut(firebaseAuth).then(()=>    toast.update(id,{ render: "Logout successfully",
    type: "success", 
    isLoading: false, 
    autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})).catch(()=>    toast.update(id,{ render: "Error loging out",
    type: "error", 
    isLoading: false, 
    autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'}))
  }

  useEffect(() => {
    const logedInUser = onAuthStateChanged(firebaseAuth, (user) => {
   
      setLogedInUser(user);
    });
  }, []);

  return (
    <FirebaseAuthContext.Provider
      value={{
        registerUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        logedInUser,
        logOut
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
export { FirebaseAuthContext, FirebaseAuthContextProvider };
