import { put, takeEvery, call } from "redux-saga/effects";
import { setInitialData,  } from "./dataSlice";
import axios from "axios";

const getInitialData = () => {
  return axios.get("https://627bcd4fa01c46a85325be85.mockapi.io/doomys1234/transactions");
}

function* dataWorker() {
       try {
           const { data } = yield call(getInitialData);
           const normaLizedData = data.map(item => {
               if (!item.Status) {
                   return {...item,Status:"Completed"}
               }
           })
        yield put(setInitialData(normaLizedData))
    } catch (error) {
        console.log(error);
    }
}

export function* dataWatcher() {
    yield takeEvery("GETDDATA", dataWorker);
    
}