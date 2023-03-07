import React, {useContext} from "react";
import './checkoutItem.styles.scss';
import {CartContext} from "../../context/cart.context";
import {useDispatch, useSelector} from "react-redux";
import {setCartItem} from "../../redux/action/cart/cart.action";

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(item => item.cart.cartItems);
    // const {ClearItemToCartProduct, removeItemToCartProduct, addToCartProduct} = useContext(CartContext);
    const handleClearItemFromCart = () => {
        dispatch(setCartItem(clearItemFromCart(cartItems,cartItem)));
    }
    const addItemHandler = () => {
        dispatch(setCartItem(cartAddItem(cartItems,cartItem)));
    }
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
    const removeItemHandler = () => {
        dispatch(setCartItem(cartRemoveItem(cartItems,cartItem)));
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
    return (
        <div className={"checkout-item-container"}>
            <div className={"image-container"}>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className={"name"}>{name}</span>
            <span className={"quantity"}>
                <div className={"arrow"} onClick={removeItemHandler}>&#10094;</div>
                <span className={"value"}>{quantity}</span>
                <div className={"arrow"} onClick={addItemHandler}>&#10095;</div></span>
            <span className={"price"}>{price}</span>
            <div className={"remove-button"} onClick={handleClearItemFromCart}>&#10005;</div>
        </div>
    )
}
export default CheckoutItem;