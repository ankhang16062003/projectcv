const ListUsersReducer = (state, action) => {
    switch(action.type){
        case 'GET_LISTUSERS_START': 
            return {
                listUsers: [],
                isFetching: true,
                error: false,
            }
        case 'GET_LISTUSERS_SUCCESS': 
            return {
                listUsers: action.payload,
                isFetching: false,
                error: false,
            }
        case 'GET_LISTUSERS_ERROR': 
            return {
                listUsers: [],
                isFetching: false,
                error: true,
            }
        case 'DELETE_USER_START': 
            return {
                ...state,
                isFetching: true,
                error: false,
            }
        case 'DELETE_USER_SUCCESS': 
            return {
                listUsers: state.listUsers.filter(user => user._id !== action.payload),
                isFetching: false,
                error: false,
            }
        case 'DELETE_USER_ERROR': 
            return {
                ...state,
                isFetching: false,
                error: true,
            }
        default:
            return {...state}
    }
}

export default ListUsersReducer