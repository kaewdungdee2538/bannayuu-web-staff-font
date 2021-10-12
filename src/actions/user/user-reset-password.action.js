import { setFetching, setSuccess, setFailed } from 'actions/main/main.action'
import { MAIN_URL, RESET_PASSWORD_USER_API } from 'constants/api-route'
import { httpClientPOSTMethodVerifyAuth } from 'utils/httpClient.utils'
import {MESSAGE_SUCCESS} from 'constants/message.constant'
import swal from 'sweetalert';


export const ResetPasswordUserAction = (history, credential, authStore) => {
    return async dispatch => {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${RESET_PASSWORD_USER_API}`
            const valuesObj = { ...credential }
            const result = await httpClientPOSTMethodVerifyAuth({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning");
            } else {
                swal("Success", MESSAGE_SUCCESS, "success")
                    .then(() => {
                        dispatch(setSuccess());
                        const url_reset_password = `${result.result}`
                        console.log(url_reset_password)
                        history.push('/user-reset-password-list')
                        window.open(url_reset_password);
                    });
            }
    }
}



