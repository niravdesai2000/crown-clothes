import React, {useContext, useEffect, useState} from "react";
import './categories.styles.scss';
import {useParams} from "react-router-dom";
import {ProductContext} from "../../context/product.context";
import ProductCard from "../product-card";

const Categories = () => {
    const {categories} = useParams();
    const {product} = useContext(ProductContext);
    const [categoriesProduct, setCategoriesProduct] = useState([]);
    useEffect(() => {
        setCategoriesProduct(() => {
            return product[categories]
        });
    }, [categories, product])
    return (
        <>
            <h2 className={'categories-title'}>{categories.toUpperCase()}</h2>
            <div className={'categories-item-container'}>
                {categoriesProduct && categoriesProduct.map(productItem => <ProductCard key={productItem.id} product={productItem}/>)}
            </div>
        </>
    )
}
export default Categories;