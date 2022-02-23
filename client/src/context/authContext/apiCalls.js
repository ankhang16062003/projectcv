import { publicRequest} from "../../requestMethods";
import {
    login_start,
    login_success,
    login_error,
} from './AuthAction'

//LOGIN
export const login = async (dispatch, dataLogin) => {
    dispatch(login_start())
    try {
        const res = await publicRequest.post('/auth/login/', dataLogin)
        res && dispatch(login_success(res.data))
    }catch(err) {
        dispatch(login_error())
    }
}