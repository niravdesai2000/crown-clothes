import {all,call} from 'redux-saga/effects';
import {categoriesSaga} from "../action/categories/categories.saga";
import {userSaga} from "../action/user/user.saga";

export function* rootSaga() {
yield all([call(categoriesSaga),call(userSaga)]);
}