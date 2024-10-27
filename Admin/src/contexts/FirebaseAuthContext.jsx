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
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
        .then(async (usr) => {
          const { uid } = usr.user;
          console.log("Registered user:", uid);
          if(user){
            toast.success("Registered successfully !")
          }
        
        })
        .catch((error) => {console.log("Error register user:", error);
       
        toast.error("Invalid input !");
      });
    } catch (error) {
      
      toast.error("Error registering user !");
    }
  };

  const loginUserWithEmailAndPassword = async (email, password) => {
    console.log("e:",email,"p",password)
    try {
      const user = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
        .then((user) => {
          console.log("Logined user:", user);
          if(user){
            toast.success("Logined Successfully !")
          }
        })
        .catch((error) => {
          console.log("Error login user:", error);
          
         
        });
    } catch (error) {
      alert("Unexpected Error");
      toast.error("Wrong Email or Password");
    }
  };
  const logOut=async()=>{
    await signOut(firebaseAuth).then(()=>toast.success("LogOut successfully !")).catch(()=>toast.error("Error logOuting user"))
  }

  useEffect(() => {
    const logedInUser = onAuthStateChanged(firebaseAuth, (user) => {
      console.log("logedInUser::", user);
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
