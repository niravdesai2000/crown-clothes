import {createContext, useEffect, useState} from "react";

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


export const CartContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);
    const addToCartProduct = (product) => {
        setCartItems(cartAddItem(cartItems, product));
    }
    const removeItemToCartProduct = (product) => {
        setCartItems(cartRemoveItem(cartItems, product));
    }
    const ClearItemToCartProduct = (cartItemClear) => {
        setCartItems(clearItemFromCart(cartItems, cartItemClear));
    }
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
        setCartCount(newCartCount);

        const finalTotal = cartItems.reduce((total, item) => total + item.price*item.quantity, 0)
        setTotal(finalTotal);

    }, [cartItems])
    const value = {
        isOpen,
        setIsOpen,
        cartItems,
        setCartItems,
        addToCartProduct,
        cartCount,
        removeItemToCartProduct,
        ClearItemToCartProduct,
        total
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}