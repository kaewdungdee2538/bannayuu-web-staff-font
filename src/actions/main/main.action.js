import {
    HTTP_FETCHING,
    HTTP_SUCCESS,
    HTTP_FAILED
} from '../../constants/constants.utils'
import { MAIN_URL } from '../../constants/api-route'
import { httpClientGetMethod } from '../../utils/httpClient.utils'
import swal from 'sweetalert';

export const setFetching = () => ({
    type: HTTP_FETCHING
})

export const setSuccess = () => ({
    type: HTTP_SUCCESS,
})

export const setFailed = () => ({
    type: HTTP_FAILED
})

export const checkJWTTOKENAction = (history,authStore) => {
    const valuesObj = authStore.loginReducer.result;
    return async dispatch => {
        dispatch(setFetching());
        const urlClient = `${MAIN_URL}`
        const result = await httpClientGetMethod({ urlClient,valuesObj })
        console.log(result)
        if(!result){
            dispatch(setFailed());
            history.push('/page500');
        }
        else if(result.error){
            dispatch(setFailed());
            swal("Warning!", result.message, "warning");
            history.push('/login');
        }else{
            dispatch(setSuccess())
        }
    }
}