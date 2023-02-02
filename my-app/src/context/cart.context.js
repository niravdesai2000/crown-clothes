import {createContext, useReducer} from "react";

const cartAddItem = (cartItems, product) => {
    const isAvailable = cartItems.find(cartItem => cartItem.id === product.id);
    if (isAvailable) {
        return cartItems.map(cartItem =>
            cartItem.id === product.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        )
    }
    return [...cartItems, {...product, quantity: 1}]
}

const cartRemoveItem = (cartItems, product) => {
    const isAvailable = cartItems.find(cartItem => cartItem.id === product.id);
    if (isAvailable.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== product.id)
    }
    return cartItems.map(cartItem =>
        cartItem.id === product.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
    )
}
const clearItemFromCart = (cartItems, cartItemClear) => {
    const clearItemCart = cartItems.filter(cartItem => cartItem.id !== cartItemClear.id);
    return clearItemCart;
}

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => null,
    cartItems: [],
    addToCartProduct: () => null,
    removeItemToCartProduct: () => null,
    cartCount: 0,
    clearItemFromCart: () => null,
    total: 0,
})
export const setCartItemReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case cartConstant.SET_CART_ITEM:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`cart item ${type} reducer not working..`)
    }
}
const INITIAL_VALUE = {
    isOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0
}
export const cartConstant = {
    SET_CART_ITEM: 'SET_CART_ITEM',
    CART_TO_OPEN: 'CART_TO_OPEN'
}
export const CartContextProvider = ({children}) => {

    /*   const [isOpen, setIsOpen] = useState(false);
       const [cartItems, setCartItems] = useState([]);
       const [cartCount, setCartCount] = useState(0);
       const [total, setTotal] = useState(0);*/
    const [{cartItems, isOpen, cartCount, total}, dispatch] = useReducer(setCartItemReducer, INITIAL_VALUE)

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        const finalTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        dispatch({
            type: cartConstant.SET_CART_ITEM,
            payload: {cartItems: newCartItems, cartCount: newCartCount, total: finalTotal}
        })
    }
    const addToCartProduct = (product) => {
        const newCartItems = (cartAddItem(cartItems, product));
        updateCartItemReducer(newCartItems);
    }
    const removeItemToCartProduct = (product) => {
        const newCartItems = (cartRemoveItem(cartItems, product));
        updateCartItemReducer(newCartItems);
    }
    const ClearItemToCartProduct = (cartItemClear) => {
        const newCartItems = (clearItemFromCart(cartItems, cartItemClear));
        updateCartItemReducer(newCartItems);
    }
    const setIsOpen = bool => {
        dispatch({type: cartConstant.CART_TO_OPEN, payload: bool})
    }
    /*useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
        setCartCount(newCartCount);

        const finalTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        setTotal(finalTotal);

    }, [cartItems])*/
    const value = {
        isOpen,
        setIsOpen,
        cartItems,
        addToCartProduct,
        cartCount,
        removeItemToCartProduct,
        ClearItemToCartProduct,
        total
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}