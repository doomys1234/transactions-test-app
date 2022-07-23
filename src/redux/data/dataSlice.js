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

    
}

export const dataReducer = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setInitialData: (state,{payload}) => {
            state.initialData = payload
            state.isLoaded = true
        },
        setData: (state, {payload}) => {
            state.dataFile = payload
            state.isFileLoaded= true
        },
        setFileName: (state,{payload}) => {
            state.fileName= payload
        },
        filterData: (state,{payload}) => {
            state.dataFile= state.dataFile.filter(item=> item=== payload)
        },
        deleteData: (state, { payload }) => {
            state.dataFile= state.dataFile.filter(item=> item.TransactionId !== payload)

        },
        incrementPage: (state) => {
            state.page+=1
        },
        decrementPage: (state) => {
            state.page-=1
        },
        modalToggle: (state) => {
            state.showModal= !state.showModal
        }
    }
})
export const getData = () => ({ type: "GETDDATA" })

export const { setInitialData,setData, setFileName, deleteData,incrementPage, decrementPage, modalToggle} = dataReducer.actions
export default dataReducer.reducer