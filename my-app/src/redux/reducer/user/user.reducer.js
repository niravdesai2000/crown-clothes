import {userConstant} from "../../action/user/user.types";

const INITIAL_USER_STATE = {
    currentUser: null
};
export const userReducer = (state = INITIAL_USER_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case userConstant.USER_IS_LOGIN:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state
    }
}
