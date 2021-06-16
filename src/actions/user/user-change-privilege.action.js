import { setFetching, setSuccess, setFailed } from 'actions/main/main.action'
import { MAIN_URL, CHANGE_PRIVILEGE_USER_API } from 'constants/api-route'
import { httpClientPOSTMethodFormData } from 'utils/httpClient.utils'
import swal from 'sweetalert';


export const ChangePrivilegeUserAction = (history, credential, authStore) => {
    return async dispatch => {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${CHANGE_PRIVILEGE_USER_API}`
            const valuesObj = { ...credential }
            const result = await httpClientPOSTMethodFormData({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning");
            } else {
                swal("Success", result.message, "success")
                    .then(() => {
                        dispatch(setSuccess());
                        history.push('/admin/user-change-privilege-list')
                    });
            }
    }
}



