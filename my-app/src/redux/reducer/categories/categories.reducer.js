import {categoriesConstant} from "../../action/categories/categories.types";

const INITIAL_USER_STATE = {
    categories: []
};
export const categoriesReducer = (state = INITIAL_USER_STATE, action={}) => {
    const {type, payload} = action;
    switch (type) {
        case categoriesConstant.CATEGORIES_SHOP_DATA:
            return {
                ...state,
                categories:payload
            }
        default:
            return state
    }
}