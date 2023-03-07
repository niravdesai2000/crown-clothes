import {userConstant} from "./user.types";

export const currentUser = user => ({
        type:userConstant.USER_IS_LOGIN,
        payload:user
    });
