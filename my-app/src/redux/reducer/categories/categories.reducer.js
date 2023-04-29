import {categoriesConstant} from "../../action/categories/categories.types";

const INITIAL_CATEGORIES_STATE = {
    isLoading:false,
    error:null,
    categories: []
};
export const categoriesReducer = (state = INITIAL_CATEGORIES_STATE, action={}) => {
    const {type, payload} = action;
    switch (type) {
        case categoriesConstant.FETCH_CATEGORIES_DATA_START:
            return {...state, isLoading:true }
        case categoriesConstant.FETCH_CATEGORIES_DATA_SUCCESS:
            return {...state, isLoading:false, categories: payload }
        case categoriesConstant.FETCH_CATEGORIES_DATA_FAIL:
            return {...state, isLoading:false, error: payload }
        default:
            return state;
    }
}