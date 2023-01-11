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

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => null,
    cartItems: [],
    addToCartProduct: () => null,
    cartCount:0
})


export const CartContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const addToCartProduct = (product) => {
        setCartItems(cartAddItem(cartItems, product));
    }
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,item)=>total +item.quantity,0)
        setCartCount(newCartCount);
    },[cartItems])
    const value = {isOpen, setIsOpen, cartItems, setCartItems, addToCartProduct,cartCount};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}