import { put, takeEvery, call } from "redux-saga/effects";
import { setData, setInitialData } from "./dataSlice";
import axios from "axios";

const getInitialData = (payload) => {
  return axios.get("https://627bcd4fa01c46a85325be85.mockapi.io/doomys1234/transactions");
}

function* dataWorker() {
       try {
           const {data} = yield call(getInitialData);
        yield put(setInitialData(data))
    } catch (error) {
        console.log(error);
    }
}

export function* dataWatcher() {
    yield takeEvery("GETDDATA", dataWorker);
    
}