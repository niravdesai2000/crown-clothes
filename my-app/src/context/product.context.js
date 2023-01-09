import {createContext, useEffect, useState} from "react";
import shopData from '../components/shopData/shopData.json';

export const ProductContext = createContext({
    product: [],
    setProduct: () => null
})

export const ProductProvider = ({children}) => {
    const [product, setProduct] = useState([]);
    useEffect(()=>{
        setProduct(shopData);
    },[])
    const value = {product, setProduct};
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}