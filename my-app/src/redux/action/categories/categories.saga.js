import {getCategoriesAndDocuments} from "../../../utils/firebase/firebase.utils";
import {fetchCategoriesFail, fetchCategoriesSuccess} from "./categories.action";
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {categoriesConstant} from "./categories.types";

export function* categoriesSaga() {
yield all([call(onFetchCategories)]);
}

export function* fetchCategoriesAsync (){
    try{
        const getCategories = yield getCategoriesAndDocuments();
        yield put(fetchCategoriesSuccess(getCategories));
    }
    catch (error) {
        yield put(fetchCategoriesFail(error));
    }

}

export function* onFetchCategories() {
yield takeLatest(categoriesConstant.FETCH_CATEGORIES_DATA_START,fetchCategoriesAsync);
}