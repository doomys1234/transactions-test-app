import { all } from "redux-saga/effects";
import { userWatcher } from "./auth/authSaga";
import { dataWatcher } from "./data/dataSaga";

export function* rootWatcher() {
    yield all([dataWatcher(),userWatcher()]);
    
}