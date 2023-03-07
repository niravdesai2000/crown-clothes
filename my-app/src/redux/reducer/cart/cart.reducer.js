import {cartConstant} from "../../action/cart/cart.types";

const INITIAL_CART_STATE = {
    isOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0
}
export const cartReducer = (state = INITIAL_CART_STATE, action={}) => {
    const {type, payload} = action;
    switch (type) {
        case cartConstant.SET_CART_ITEM:
            return {
                ...state,
                cartItems:payload
            }
        case cartConstant.CART_TO_OPEN:
            return {
                ...state,
                isOpen: payload
            }
        case cartConstant.SET_CART_COUNT:
            return {
                ...state,
                cartCount: payload
            }
        case cartConstant.SET_CART_TOTAL:
            return {
                ...state,
                total: payload
            }
        default:
            return state
    }
}