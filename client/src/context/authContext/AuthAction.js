//LOGIN_START
export const login_start = () => ({
    type: 'LOGIN_START',
})

//LOGIN_SUCCESS
export const login_success = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
})

//LOGIN_ERROR
export const login_error = () => ({
    type: "LOGIN_ERROR",
})

//LOGOUT
export const logout = () => ({
    type: 'LOGOUT',
})