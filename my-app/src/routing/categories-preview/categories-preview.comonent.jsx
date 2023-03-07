import React from 'react';
import './categories-preview.styles.scss';
import CategoryPreview from "../../components/category-priview";
import {useSelector} from "react-redux";

const CategoriesPreview = () => {
    // const {product} = useContext(ProductContext);
    const categoriesData = useSelector(data => data?.categories?.categories);
    return (
        <div className={"categories-container"}>
            {Object.keys(categoriesData).map(title => {
                const categories = categoriesData[title];
                return <CategoryPreview key={title} title={title} products={categories}/>
            })}
        </div>
    )
}
export default CategoriesPreview;