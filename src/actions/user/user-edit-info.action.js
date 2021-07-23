
import { setFetching, setSuccess, setFailed } from 'actions/main/main.action'
import { MAIN_URL, EDIT_USER_INFO_API } from 'constants/api-route'
import { httpClientPOSTMethodVerifyAuth } from 'utils/httpClient.utils'
import swal from 'sweetalert';


export const EditUserAction = (history, credential, authStore) => {
    return async dispatch => {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${EDIT_USER_INFO_API}`
            const valuesObj = { ...credential }
            const result = await httpClientPOSTMethodVerifyAuth({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning");
            } else {
                swal("Success", result.message, "success")
                    .then(() => {
                        dispatch(setSuccess());
                        history.push('/user-edit-list')
                    });
            }
    }
}



