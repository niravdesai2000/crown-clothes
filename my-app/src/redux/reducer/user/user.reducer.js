import {userConstant} from "../../action/user/user.types";

const INITIAL_USER_STATE = {
    currentUser: null,
    isLoading: false,
    error:null
};
export const userReducer = (state = INITIAL_USER_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case userConstant.SIGN_WITH_SUCCESS:
            return {...state, currentUser: payload }
        case userConstant.SIGN_OUT_SUCCESS:
            return {...state, currentUser: null }
        case userConstant.SIGN_WITH_FAIL:
        case userConstant.SIGN_OUT_FAIL:
        case userConstant.SIGN_UP_FAIL:
            return {...state, error: payload }
        default:
            return state
    }
}
