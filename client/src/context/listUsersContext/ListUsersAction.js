//GET LISTUSERS START
export const getListUsersStart = () => ({
    type: 'GET_LISTUSERS_START',
})

//GET LISTUSERS SUCCESS
export const getListUsersSuccess = (user) => ({
    type: 'GET_LISTUSERS_SUCCESS',
    payload: user,
})

//GET LISTUSERS ERROR
export const getListUsersError = () => ({
    type: 'GET_LISTUSERS_ERROR',
})

//DELETE USER START
export const deleteUserStart = () => ({
    type: 'DELETE_USER_START',
})

//DELETE USER SUCCESS
export const deleteUserSuccess = (id) => ({
    type: 'DELETE_USER_SUCCESS',
    payload: id,
})

//DELETE USER ERROR
export const deleteUserError = () => ({
    type: 'DELETE_USER_ERROR',
})