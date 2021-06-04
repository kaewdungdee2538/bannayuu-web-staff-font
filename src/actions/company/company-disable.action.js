import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    MESSAGE_NOTSELECTIMAGE,
    MESSAGE_REMARKNOTFOUND
} from 'constants/message.constant'
import { MAIN_URL, DISABLE_COMPANY_API } from 'constants/api-route'
import { httpClientPOSTMethodFormData } from 'utils/httpClient.utils'


export const DisableCompanyAction = (history, credential, authStore) => {
    return async dispatch => {
        if (disableCompanyMiddleware(credential)) {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${DISABLE_COMPANY_API}`
            const valuesObj = { ...credential }
            const result = await httpClientPOSTMethodFormData({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning");
            } else {
                swal("Success", result.message, "success")
                    .then(() => {
                        refreshPage();
                        dispatch(setSuccess());
                    });
            }
        }
    }
}

function disableCompanyMiddleware(valuesObj) {
     if (!valuesObj.image) {
        swal("Warning!", MESSAGE_NOTSELECTIMAGE, "warning");
        return false;
    } else if(!valuesObj.remark){
        swal("Warning!", MESSAGE_REMARKNOTFOUND, "warning");
        return false;
    }
    return true;
}

function refreshPage() {
    window.location.reload(false);
}