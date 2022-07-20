export const getUsername = state => state.auth.user;
export const getStatus = state => state.auth.isLoggedIn
export const getError = state=> state.auth.error

const authSelectors = {
    getUsername,
    getStatus,
}

export default authSelectors;