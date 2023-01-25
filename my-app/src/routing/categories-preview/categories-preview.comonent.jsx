import React, {useContext} from 'react';
import './categories-preview.styles.scss';
import {ProductContext} from "../../context/product.context";
import CategoryPreview from "../../components/category-priview";

const CategoriesPreview = () => {
    const {product} = useContext(ProductContext);
    return (
        <div className={"categories-container"}>
            {Object.keys(product).map(title => {
                const products = product[title];
                return <CategoryPreview key={title} title={title} products={products}/>
            })}
        </div>
    )
}
export default CategoriesPreview;