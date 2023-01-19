import React, {useContext} from "react";
import './checkoutItem.styles.scss';
import {CartContext} from "../../context/cart.context";

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {ClearItemToCartProduct, removeItemToCartProduct, addToCartProduct} = useContext(CartContext);
    const handleClearItemFromCart = () => ClearItemToCartProduct(cartItem);
    const addItemHandler = () => addToCartProduct(cartItem);
    const removeItemHandler = () => removeItemToCartProduct(cartItem);

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