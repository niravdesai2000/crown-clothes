import React, {useEffect} from "react";
import './checkout.styles.scss';
import CheckoutItem from "../../components/checkout-item";
import {useDispatch, useSelector} from "react-redux";
import {cartCount, cartFinalTotal} from "../../redux/action/cart/cart.action";
import StripForm from "../../components/payment-method";

const Checkout = () => {
    const cartItems = useSelector(item => item.cart.cartItems);
    // const {cartItems, total} = useContext(CartContext);
    const total = useSelector(item => item.cart.total);
    const dispatch = useDispatch();
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        dispatch(cartCount(newCartCount));
        const finalTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        dispatch(cartFinalTotal(finalTotal));

    }, [cartItems])
    return (
        <div className={"checkout-container"}>
            <div className={"checkout-header"}>
                <div className={"header-block"}>
                    <span>Product</span>
                </div>
                <div className={"header-block"}>
                    <span>Description</span>
                </div>
                <div className={"header-block"}>
                    <span>Quantity</span>
                </div>
                <div className={"header-block"}>
                    <span>Price</span>
                </div>
                <div className={"header-block"}>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
            <span className={"total"}>Total: {total}</span>
            <StripForm/>
        </div>
    )
}
export default Checkout;