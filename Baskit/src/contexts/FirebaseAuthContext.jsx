import { firebaseApp } from '../utils/FirebaseApp';
import { createContext } from ("react");
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'


const firebaseAuth = getAuth(firebaseApp);

const FirebaseAuthContext = createContext();
const FirebaseAuthContextProvider = ({ children }) => {

    const registerUserWithEmailAndPassword = async (email, password) => {

        try {
            const user = await createUserWithEmailAndPassword(firebaseAuth, email, password).then((user) => {
                console.log("Registered user:", user)
            }).catch((error) => console.log("Error register user:", error))

        } catch (error) {
            alert("Unexpected Error !")
        }


    }
    const loginUserWithEmailAndPassword=async(email,password)=>{

     try{
        const user=await signInWithEmailAndPassword(firebaseAuth,email,password).then((user)=>{
            console.log("Logined user:",user);
            alert("User successfully logined")
        }).catch((error)=>{
            console.log("Error login user:",error)
        })
     }
     catch(error){
        alert("Unexpected Error")
     }

    }


    return <FirebaseAuthContext.Provider value={{registerUserWithEmailAndPassword,loginUserWithEmailAndPassword}} />
}

export { FirebaseAuthContext, FirebaseAuthContextProvider }