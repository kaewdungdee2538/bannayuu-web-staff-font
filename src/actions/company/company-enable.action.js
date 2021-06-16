import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    MESSAGE_NOTSELECTIMAGE,
    MESSAGE_REMARKNOTFOUND,
    MESSAGE_FILE_IMAGE_INVALID
} from 'constants/message.constant'
import { MAIN_URL, ENABLE_COMPANY_API } from 'constants/api-route'
import { httpClientPOSTMethodFormData } from 'utils/httpClient.utils'
import { getExtension, isImage } from "utils/funcImage.utils"


export const EnableCompanyAction = (history, credential, authStore) => {
    return async dispatch => {
        if (enableCompanyMiddleware(credential)) {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${ENABLE_COMPANY_API}`
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

function enableCompanyMiddleware(valuesObj) {
    if (!valuesObj.image) {
        swal("Warning!", MESSAGE_NOTSELECTIMAGE, "warning");
        return false;
    } else if (!isImage(getExtension(valuesObj.image.name))) {
        swal("Warning!", MESSAGE_FILE_IMAGE_INVALID, "warning");
        return false;
    } else if (!valuesObj.remark) {
        swal("Warning!", MESSAGE_REMARKNOTFOUND, "warning");
        return false;
    }
    return true;
}

function refreshPage() {
    window.location.reload(false);
}