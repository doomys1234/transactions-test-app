import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    initialData:[],
    dataFile: [],
    fileName:"",
    errorUpload: null,
    isLoaded: false,
    isFileLoaded: false,
    page: 1,
    showModal: false,
    showEditModal:false,
    transaction: {},
    transactionStatus:'successful',

    
}

export const dataReducer = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setInitialData: (state, { payload }) => {
            state.initialData = payload
            state.isLoaded = true
        },
        setData: (state, { payload }) => {
            state.dataFile = payload
            state.isFileLoaded = true
        },
        setFileName: (state, { payload }) => {
            state.fileName = payload
        },
        filterDataFile: (state, { payload }) => {
            state.dataFile = state.dataFile.filter(item => item === payload)
        },
        deleteDataFile: (state, { payload }) => {
            state.dataFile = state.dataFile.filter(item => item.TransactionId !== payload)

        },
        filterInitialData: (state, { payload }) => {
            // state.initialData=state.initialData.filter(item=>item.TransactionId!== payload)
        },
        deleteInitialData: (state, { payload }) => {
            state.initialData = state.initialData.filter(item => item.TransactionId !== payload)
        },
        incrementPage: (state) => {
            state.page += 1
        },
        decrementPage: (state) => {
            state.page -= 1
        },
        modalToggle: (state) => {
            state.showModal = !state.showModal
        },
        editModalToggle: (state) => {
            state.showEditModal = !state.showEditModal
        },
        setTransaction: (state, { payload }) => {
            state.transaction = payload
        },
        setTransactionStatus: (state, { payload }) => {
            state.transactionStatus= payload
        }
    }
})
export const getData = () => ({ type: "GETDDATA" })

export const { setInitialData,setData, setFileName, deleteDataFile,incrementPage, decrementPage, modalToggle, filterInitialData, deleteInitialData, setTransaction, editModalToggle, setTransactionStatus} = dataReducer.actions
export default dataReducer.reducer