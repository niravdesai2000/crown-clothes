import React from "react";
import { googleSignInWithPopup } from "../../utils/firebase/firebase.utils";
const SignIn = () => {
  const logWithGoogle = async () => {
    const response = await googleSignInWithPopup();
    console.log(response);
  };
  return (
    <>
      <div>Sign-In</div>
      <button onClick={() => logWithGoogle()}>Sign In</button>
    </>
  );
};
export default SignIn;
