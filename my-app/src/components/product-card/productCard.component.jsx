import React, {useContext} from "react";
import './productCardstyles.scss';
import Button from "../button";
import {CartContext} from "../../context/cart.context";

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addToCartProduct} = useContext(CartContext);
    const handleAddToCart = () => {
        addToCartProduct(product);
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