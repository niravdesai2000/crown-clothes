import React, {useEffect} from 'react';
import './shop.styles.scss';
import {Route, Routes} from 'react-router-dom'
import CategoriesPreview from "../categories-preview/categories-preview.comonent";
import Categories from "../../components/categories";
import {addCollectionAndDocuments, getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {SHOP_DATA} from "../../components/shopData/shopData";
import {useDispatch} from "react-redux";
import {fetchCategoriesStart, getCategoriesProduct} from "../../redux/action/categories/categories.action";

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        addCollectionAndDocuments('categories', SHOP_DATA);
        dispatch(fetchCategoriesStart());
    },[])
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":categories" element={<Categories/>}/>
        </Routes>
    )
}
export default Shop;