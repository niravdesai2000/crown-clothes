import {cartConstant} from "./cart.types";

export const isCartOpen = value => {
    return {
        type: cartConstant.CART_TO_OPEN,
        payload: value
    }
}

export const cartCount = count => {
    return {
        type: cartConstant.SET_CART_COUNT,
        payload: count
    }
}

export const cartFinalTotal = total => {
    return {
        type: cartConstant.SET_CART_TOTAL,
        payload: total
    }
}

export const setCartItem = item => {
    return {
        type: cartConstant.SET_CART_ITEM ,
        payload: item
    }
}