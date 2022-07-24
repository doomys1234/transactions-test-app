import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: [],
  dataFile: [],
  filteredItems: [],
  fileName: "",
  errorUpload: null,
  isLoaded: false,
  isFileLoaded: false,
  page: 1,
  showModal: false,
  showEditModal: false,
  transaction: {},
  transactionStatus: "No filter",
};

export const dataReducer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setInitialData: (state, { payload }) => {
      state.initialData = payload;
      state.isLoaded = true;
    },
    setData: (state, { payload }) => {
      state.dataFile = payload;
      state.filteredItems = payload;
      state.isFileLoaded = true;
    },
    setFileName: (state, { payload }) => {
      state.fileName = payload;
    },
    filterDataFile: (state, { payload }) => {
      state.filteredItems = state.dataFile.filter((item) => {
        if (payload === "No filter") {
          return state.dataFile;
        }
        return item.Status === payload;
      });
    },
    deleteDataFile: (state, { payload }) => {
      state.filteredItems = state.dataFile.filter(
        (item) => item.TransactionId !== payload
      );
    },
    filterInitialData: (state, { payload }) => {
      state.initialData = state.initialData.filter((item) => {
        if (payload === "No filter") {
          return state.initialData;
        }
        return item.Status === payload;
      });
    },
    deleteInitialData: (state, { payload }) => {
      state.initialData = state.initialData.filter(
        (item) => item.TransactionId !== payload
      );
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      state.page -= 1;
    },
    modalToggle: (state) => {
      state.showModal = !state.showModal;
    },
    editModalToggle: (state) => {
      state.showEditModal = !state.showEditModal;
    },
    setTransaction: (state, { payload }) => {
      state.transaction = payload;
    },
    setTransactionStatus: (state, { payload }) => {
      state.transactionStatus = payload;
    },
  },
});
export const getData = () => ({ type: "GETDDATA" });

export const {
  setInitialData,
  setData,
  setFileName,
  deleteDataFile,
  incrementPage,
  decrementPage,
  modalToggle,
  filterInitialData,
  deleteInitialData,
  setTransaction,
  editModalToggle,
  setTransactionStatus,
  filterDataFile,
} = dataReducer.actions;
export default dataReducer.reducer;
