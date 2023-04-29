import {categoriesConstant} from "./categories.types";

export const getCategoriesProduct = product => ({
    type:categoriesConstant.CATEGORIES_SHOP_DATA,
    payload:product
});

export const fetchCategoriesStart = () => ({type:categoriesConstant.FETCH_CATEGORIES_DATA_START});

export const fetchCategoriesSuccess = product => ({ type:categoriesConstant.FETCH_CATEGORIES_DATA_SUCCESS, payload:product});

export const fetchCategoriesFail = error => ({ type:categoriesConstant.FETCH_CATEGORIES_DATA_SUCCESS, payload:error});

/*
export const fetchCategoriesAsync = () => async(dispatch) => {
    dispatch(fetchCategoriesStart);
    try{
        const getCategories = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(getCategories));
    }
    catch (error) {
        dispatch(fetchCategoriesFail(error));
    }

}*/
