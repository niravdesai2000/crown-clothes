import React, {useContext} from "react";
import './shopIcon.styles.scss';
import {ReactComponent as ShoppingBagIcon} from "../../assets/shopping-bag.svg";
import {CartContext} from "../../context/cart.context";

const ShopIcon = () => {
    const {setIsOpen} = useContext(CartContext);
    const handleCartDropDown = () => setIsOpen(isOpen => !isOpen);
    return (
        <div className={"cart-icon-container"} onClick={handleCartDropDown}>
            <ShoppingBagIcon className={"shopping-icon"}/>
            <span className={"item-count"}>0</span>
        </div>
    )
}
export default ShopIcon;