import {all, call, put, takeLatest} from 'redux-saga/effects';
import {userConstant} from "./user.types";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    googleSignInWithPopup,
    signAuthUserWithEmailAndPassword, signOutUser
} from "../../../utils/firebase/firebase.utils";
import {signInFail, signInSuccess, signOutFail, signOutSuccess, signUpFail, signUpSuccess} from "./user.action";

export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInformation)
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (e) {
        yield put(signInFail(e));
    }
}

export function* startWithGoogleSignIn() {
    yield takeLatest(userConstant.GOOGLE_SIGN_WITH_START, googleWithSignIn)
}

export function* emailAndPasswordWithSignIn({payload: {email, password}}) {
    try {
        const {user} = yield call(signAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (e) {
        yield put(signInFail(e));
    }
}

export function* startWithEmailAndPassword() {
    yield takeLatest(userConstant.EMAIL_SIGN_WITH_START, emailAndPasswordWithSignIn)
}

export function* googleWithSignIn() {
    try {
        const {user} = yield call(googleSignInWithPopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (e) {
        yield put(signInFail(e));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFail(error));
    }
}

export function* signUp({payload: {email,password,displayName}}) {
    try {
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user,{displayName}))

    } catch (error) {
        yield put(signUpFail(error));
    }
}

export function* signInAfterSignUp({payload: {user,additionalInformation}}) {
    try {
        yield call(getSnapshotFromUserAuth, user, additionalInformation);
    } catch (error) {
        yield put(signUpFail(error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFail(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userConstant.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* startWithSignUp() {
    yield takeLatest(userConstant.SIGN_UP_START, signUp)
}
export function* startWithSignOut() {
    yield takeLatest(userConstant.SIGN_OUT_START, signOut)

}
export function* startWithSignUpSuccess() {
    yield takeLatest(userConstant.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSaga() {
    yield all([call(onCheckUserSession),
        call(startWithGoogleSignIn),
        call(startWithEmailAndPassword),
        call(startWithSignUp),
        call(startWithSignUpSuccess),
        call(startWithSignOut)
    ]);
}