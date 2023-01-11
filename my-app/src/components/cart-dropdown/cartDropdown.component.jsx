import React, {useContext} from "react";
import Button from "../button";
import './cartDropdown.styles.scss';
import CartItem from "../cart-item";
import {CartContext} from "../../context/cart.context";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    return (
        <div className={"cart-dropdown-container"}>
            <div className={"cart-items"}>
                {cartItems.map(item => <CartItem cartItem={item}/>)}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
}
export default CartDropdown;