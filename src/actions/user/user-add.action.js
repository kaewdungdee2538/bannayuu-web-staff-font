import { setFetching, setSuccess, setFailed } from 'actions/main/main.action'
import { MAIN_URL, CREATE_USER_API } from 'constants/api-route'
import { httpClientPOSTMethodVerifyAuth } from 'utils/httpClient.utils'
import swal from 'sweetalert';


export const CreateUserAction = (history, credential, authStore) => {
    return async dispatch => {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${CREATE_USER_API}`
            const valuesObj = { ...credential }
            const result = await httpClientPOSTMethodVerifyAuth({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning");
            } else {
                swal("Success", result.message, "success")
                    .then(() => {
                        dispatch(setSuccess());
                        history.push('/user-add-select')
                    });
            }
    }
}



