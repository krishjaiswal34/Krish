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
          addUserToDB(uid);
        })
        .catch((error) => console.log("Error register user:", error));
    } catch (error) {
      alert("Unexpected Error !");
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
          alert("User successfully logined");
        })
        .catch((error) => {
          console.log("Error login user:", error);
        });
    } catch (error) {
      alert("Unexpected Error");
    }
  };
  const logOut=async()=>{
    await signOut(firebaseAuth);
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
