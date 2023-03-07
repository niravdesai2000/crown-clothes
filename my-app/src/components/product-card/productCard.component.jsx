import React, {useContext, useEffect} from "react";
import './productCardstyles.scss';
import Button from "../button";
import {CartContext} from "../../context/cart.context";
import {useDispatch, useSelector} from "react-redux";
import {cartCount, cartFinalTotal, setCartItem} from "../../redux/action/cart/cart.action";

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const dispatch = useDispatch();
    // const {addToCartProduct} = useContext(CartContext);
    const cartItems = useSelector(item => item.cart.cartItems);
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        dispatch(cartCount(newCartCount));
        const finalTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        dispatch(cartFinalTotal(finalTotal));

    },[cartItems])
    const handleAddToCart = () => {
        dispatch(setCartItem(addToCartProduct(cartItems,product)));
    }
    const addToCartProduct = (cartItems, product) => {
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

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={"inverted"} onClick={handleAddToCart}>Add To Cart</Button>
        </div>
    )
}
export default ProductCard;