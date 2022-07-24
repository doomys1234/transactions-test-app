export const getFileName = state => state.data.fileName
export const getDataStatus = state => state.data.isLoaded
export const getInitialData = state => state.data.initialData
export const getFileStatus =  state=> state.data.isFileLoaded
export const getFileData = state => state.data.dataFile
export const getCurrentPage = state => state.data.page
export const getShowModal = state => state.data.showModal
export const getTransaction = state => state.data.transaction
export const getEditModal = state => state.data.showEditModal
export const getTransactionStatus = state => state.data.transactionStatus
export const getFilteredItems = state=>state.data.filteredItems