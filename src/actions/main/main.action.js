import {
    HTTP_FETCHING,
    HTTP_SUCCESS,
    HTTP_FAILED
} from 'constants/constants.utils'
import { MAIN_URL } from 'constants/api-route'
import { httpClientGetMethod } from 'utils/httpClient.utils'
import swal from 'sweetalert';
import {setGetCompanyAllClearStore} from 'actions/company/company-edit.action'

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
        resetValuesAll(dispatch);
        dispatch(setFetching());
        const urlClient = `${MAIN_URL}`
        const result = await httpClientGetMethod({ urlClient,valuesObj })
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

function resetValuesAll(dispatch){
    //------reset store for company get all
    dispatch(setGetCompanyAllClearStore());
}