import React, {useContext, useEffect} from "react";
import Button from "../button";
import './cartDropdown.styles.scss';
import CartItem from "../cart-item";
import {CartContext} from "../../context/cart.context";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cartCount, cartFinalTotal} from "../../redux/action/cart/cart.action";

const CartDropdown = () => {
    const dispatch = useDispatch();
    // const {cartItems} = useContext(CartContext);
    const cartItems = useSelector(item => item.cart.cartItems);
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