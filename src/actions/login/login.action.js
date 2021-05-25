import {
    HTTP_LOGIN_FETCHING,
    HTTP_LOGIN_SUCCESS,
    HTTP_LOGIN_FAILED,
    HTTP_LOGIN_CLEARVALUES,
} from '../../constants/constants.utils'
import { MAIN_URL, LOGIN_API } from '../../constants/api-route'
import { httpClientPOSTMethodNotAuth } from '../../utils/httpClient.utils'
import swal from 'sweetalert';
import {setFetching,setSuccess} from '../main/main.action'
export const setLoginFetching = () => ({
    type: HTTP_LOGIN_FETCHING
})

export const setLoginSuccess = (payload) => ({
    type: HTTP_LOGIN_SUCCESS,
    payload
})

export const setLoginFailed = () => ({
    type: HTTP_LOGIN_FAILED
})

export const setLoginClearStore = () => ({
    type: HTTP_LOGIN_CLEARVALUES
})


export const loginAction = (history, credential) => {
    return async dispatch => {
        dispatch(setLoginFetching());
        dispatch(setFetching());
        const urlClient = `${MAIN_URL}${LOGIN_API}`
        const valuesObj = { ...credential }
        const result = await httpClientPOSTMethodNotAuth({ urlClient, valuesObj })
        console.log(result)
        if(result.error){
            dispatch(setLoginFailed());
            swal("Warning!", result.message, "warning");
        }else{
            dispatch(setLoginSuccess(result.result))
            history.push('/main');
        }
        dispatch(setSuccess());
    }
}




