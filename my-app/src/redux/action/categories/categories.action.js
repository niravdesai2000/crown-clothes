import {categoriesConstant} from "./categories.types";

export const getCategoriesProduct = product => ({
    type:categoriesConstant.CATEGORIES_SHOP_DATA,
    payload:product
});