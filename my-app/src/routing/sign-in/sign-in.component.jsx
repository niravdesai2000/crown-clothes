import React from "react";
import {
  createUserDocumentFromAuth,
  googleSignInWithPopup,
} from "../../utils/firebase/firebase.utils";
const SignIn = () => {
  const logWithGoogle = async () => {
    const { user } = await googleSignInWithPopup();
    await createUserDocumentFromAuth(user);
  };
  return (
    <>
      <div>Sign-In</div>
      <button onClick={() => logWithGoogle()}>Sign In</button>
    </>
  );
};
export default SignIn;
