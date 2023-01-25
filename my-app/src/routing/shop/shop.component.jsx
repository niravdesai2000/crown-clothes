import React from 'react';
import './shop.styles.scss';
import {Route, Routes} from 'react-router-dom'
import CategoriesPreview from "../categories-preview/categories-preview.comonent";
import Categories from "../../components/categories";

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":categories" element={<Categories/>}/>
        </Routes>
    )
}
export default Shop;