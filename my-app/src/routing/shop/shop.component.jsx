import React, {useContext} from 'react';

import './shop.styles.scss';
import {ProductContext} from "../../context/product.context";
import ProductCard from "../../components/product-card";

const Shop = () => {
    const {product} = useContext(ProductContext);
    return (
        <div className='products-card-container'>
            {product.map((shopProduct) => (
                <ProductCard key={shopProduct.id} product={shopProduct}/>
            ))}
        </div>
    )
}
export default Shop;