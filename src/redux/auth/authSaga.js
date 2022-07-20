import { put, takeEvery, call } from "redux-saga/effects";
import { register, errorHandle, login, logOut} from "./authSlice";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";
const token = {
    set(token) {
        console.log("token",token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    unset() {
       axios.defaults.headers.common.Authorization = '' 
    }
}
const registerUser = (payload) => {
  return axios.post("/users/signup", payload);
};

const loginUser = (payload) => {
    return axios.post('/users/login',payload)
}

const logOutUser = (payload) => {
    return axios.post('/users/logout',payload)
}

function* registerUserWorker({ payload }) {
  try {
      const { data } = yield call(registerUser, payload);
      token.set(data.token)
    yield put(register(data));
  } catch (error) {
    yield put(errorHandle(error));
  }
}

function* loginUserWorker({ payload }) {
    try {
        const { data } = yield call(loginUser, payload);
        token.set(data.token)
        yield put(login(data))

    } catch (error) {
        yield put(errorHandle(error));
    }
}

function* logOutWorker({ payload }) {
    try {
        yield call(logOutUser, payload);
        token.unset()
        yield put(logOut())

    } catch (error) {
        yield put(errorHandle(error));
    }
}

export function* userWatcher() {
    yield takeEvery("REGISTER", registerUserWorker);
    yield takeEvery("LOGIN", loginUserWorker);
    yield takeEvery("LOGOUT", logOutWorker);
}
