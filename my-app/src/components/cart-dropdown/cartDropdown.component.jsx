import React, {useContext} from "react";
import Button from "../button";
import './cartDropdown.styles.scss';
import CartItem from "../cart-item";
import {CartContext} from "../../context/cart.context";
import {useNavigate} from "react-router-dom";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const handleGoToCheckOut = () => {
        navigate('/checkout');
    }
    return (
        <div className={"cart-dropdown-container"}>
            <div className={"cart-items"}>
                {cartItems.map(item => <CartItem cartItem={item} key={item.id}/>)}
            </div>
            <Button onClick={handleGoToCheckOut}>GO TO CHECKOUT</Button>
        </div>
    )
}
export default CartDropdown;