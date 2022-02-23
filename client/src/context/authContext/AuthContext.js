import {createContext, useEffect, useReducer} from 'react'
import AuthReducer from './AuthReducer'

const INITAIL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false,
}

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITAIL_STATE)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider 
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}