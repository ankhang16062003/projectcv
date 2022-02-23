import {publicRequest} from '../../requestMethods'
import {
    getListUsersStart,
    getListUsersSuccess,
    getListUsersError,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserError,
} from './ListUsersAction'

//GET LISTSUSER
export const getListsUser = async (dispatch) => {
    dispatch(getListUsersStart())
    try {
        const res = await publicRequest.get('/users/')
        res.data && dispatch(getListUsersSuccess(res.data))
    }catch(err) {
        dispatch(getListUsersError())
    }
}

//DELETE
export const deleteUser = async (dispatch, id) => {
    dispatch(deleteUserStart())
    try{
        await publicRequest.delete(`/users/${id}/`, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
        dispatch(deleteUserSuccess(id))
        await publicRequest.delete(`/posts/allPostsUser/${id}`, {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
        })
    }catch(err){
        dispatch(deleteUserError())
    }
}