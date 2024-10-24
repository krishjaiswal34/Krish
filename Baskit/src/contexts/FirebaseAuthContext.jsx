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

  const registerUserWithEmailAndPassword = async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
        
   
          
          if(user){
            console.log("user::::",user)
            const { uid } = user.user;
            console.log("Registered user:", uid);
            toast.success("Registered successfully !")
            addUserToDB(uid);
          }
          
        
        
    } catch (error) {
      
      toast.error("Error registering user !");
    }
  };

  const loginUserWithEmailAndPassword = async (email, password) => {
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
