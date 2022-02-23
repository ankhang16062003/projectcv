import {createContext, useReducer} from 'react'
import ListUsersReducer from './ListUsersReducer'

const INITIAL_STATE = {
    listUsers: [],
    isFetching: false,
    error: false,
}

export const ListUsersContext = createContext()

export const ListUsersContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ListUsersReducer, INITIAL_STATE)
    return (
        <ListUsersContext.Provider
            value={{
                listUsers: state.listUsers,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </ListUsersContext.Provider>
    )
}


