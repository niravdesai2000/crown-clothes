import React from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import './authentication.styles.scss';

const Authentication = () => {
    // eslint-disable-next-line no-lone-blocks
    {
        /* Google Sign In With Popup Redirect
        useEffect(() => {
          const googleSignInRedirect = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
              const userDocRef = await createUserDocumentFromAuth(response.user);
            }
          };
          googleSignInRedirect();
        }, []); */
    }

    return (
        <div className='authentication-container'>
            {/*Google Sign In With Popup Redirect
          <button onClick={googleRedirectSignInWithPopup}>
            Sign In With Redirect
          </button> 
      */}
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
};
export default Authentication;
