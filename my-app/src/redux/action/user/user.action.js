import {userConstant} from "./user.types";

export const currentUser = user => ({
    type: userConstant.USER_IS_LOGIN,
    payload: user
})

export const checkUserSession = () => ({
    type: userConstant.CHECK_USER_SESSION
});

export const googleSignInStart = () => ({
    type: userConstant.GOOGLE_SIGN_WITH_START
});

export const emailSignInStart = (email, password) => ({
    type: userConstant.EMAIL_SIGN_WITH_START,
    payload: {email, password}

});

export const signInSuccess = (user) => ({
    type: userConstant.SIGN_WITH_SUCCESS,
    payload: user

});

export const signInFail = (error) => ({
    type: userConstant.SIGN_WITH_FAIL,
    payload: error

});

export const signUpStart = (email, password, displayName) => ({
    type: userConstant.SIGN_UP_START,
    payload: {email, password, displayName}
})

export const signUpSuccess = (user, additionalDetails) => ({
    type: userConstant.SIGN_UP_SUCCESS,
    payload: {user, additionalDetails}
})

export const signUpFail = (error) => ({
    type: userConstant.SIGN_UP_FAIL,
    payload: error
})

export const signOutStart = () => ({
    type: userConstant.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: userConstant.SIGN_OUT_SUCCESS
})

export const signOutFail = (error) => ({
    type: userConstant.SIGN_OUT_FAIL,
    payload: error
})