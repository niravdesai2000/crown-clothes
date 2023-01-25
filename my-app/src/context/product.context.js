import {createContext, useEffect, useState} from "react";
import {addCollectionAndDocuments, getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";
import {SHOP_DATA} from "../components/shopData/shopData";

export const ProductContext = createContext({
    product: [],
    setProduct: () => null
})

export const ProductProvider = ({children}) => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
        const categoryMap = async () => {
            const getCategories = await getCategoriesAndDocuments();
            setProduct(getCategories)
        };
        categoryMap();
    }, [])
    const value = {product, setProduct};
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}