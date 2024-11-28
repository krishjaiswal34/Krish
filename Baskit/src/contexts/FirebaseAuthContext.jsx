import { firebaseApp } from "../utils/FirebaseApp";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { addUserToDB } from "../utils/addUserToDB";
import {toast} from 'react-toastify'

const firebaseAuth = getAuth(firebaseApp);

const FirebaseAuthContext = createContext();

const FirebaseAuthContextProvider = ({ children }) => {
  const [logedInUser, setLogedInUser] = useState(null);
  const SERVER_URL=import.meta.env.VITE_SERVER_URL
  const registerUserWithEmailAndPassword = async (email, password) => {
    const id=toast.loading("Registering user",{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
        
   
          
          if(user){
            console.log("user::::",user)
            const { uid } = user.user;
            toast.update(id,{ render: "User registered successfully ",
            type: "success", // Change type to 'success' to get green color
            isLoading: false, // Mark it as not loading anymore
            autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
            addUserToDB(uid);
          }
          
        
        
    } catch (error) {
      
      toast.update(id,{ render: "Error registering user ",
      type: "error", 
      autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    }
  };

  const loginUserWithEmailAndPassword = async (email, password) => {
    const id=toast.loading('User loging',{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    try {
      const user = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
        .then((user) => {
        
          if(user){
            toast.update(id,{ render: "User Login successfully ",
            type: "success", // Change type to 'success' to get green color
            isLoading: false, // Mark it as not loading anymore
            autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
          }
        })
        .catch((error) => {
          console.log("Error login user:", error);
         
        });
    } catch (error) {
     
      toast.update(id,{ render: "Wrong email or password",
      type: "error", // Change type to 'success' to get green color
      isLoading: false, // Mark it as not loading anymore
      autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    }
  };
  const logOut=async()=>{
    const id=toast.loading('user logouting',{style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})
    await signOut(firebaseAuth).then(()=>     toast.update(id,{ render: "Logout successfully",
    type: "error", // Change type to 'success' to get green color
    isLoading: false, // Mark it as not loading anymore
    autoClose: 3000, style:{maxWidth:'90%'},position:window.innerWidth<768?'top-center':'bottom-right'})).catch(()=>     toast.update(id,{ render: "Error loging out",
    type: "error", 
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
