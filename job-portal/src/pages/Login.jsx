import React from "react";
import { getAuth,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.config';
import {
  useNavigate,
} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleLogin=(e)=>{

    e.preventDefault() ;
    signInWithPopup(auth,googleProvider) .then((result) => {

      
      
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      navigate(-1)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  return (
    <div className=" h-screen w-full flex items-center justify-center ">
      <button className=" bg-blue px-8 py-2 text-white " onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
