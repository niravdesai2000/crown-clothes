import React, {useContext} from "react";
import './shopIcon.styles.scss';
import {ReactComponent as ShoppingBagIcon} from "../../assets/shopping-bag.svg";
import {CartContext} from "../../context/cart.context";
import {useDispatch, useSelector} from "react-redux";
import {isCartOpen} from "../../redux/action/cart/cart.action";

const ShopIcon = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(item =>item?.cart?.isOpen);
    const cartCount = useSelector(item => item.cart.cartCount);
    // const {setIsOpen,cartCount} = useContext(CartContext);
    const handleCartDropDown = () => dispatch(isCartOpen(!isOpen));
    return (
        <div className={"cart-icon-container"} onClick={handleCartDropDown}>
            <ShoppingBagIcon className={"shopping-icon"}/>
            <span className={"item-count"}>{cartCount}</span>
        </div>
    )
}
export default ShopIcon;