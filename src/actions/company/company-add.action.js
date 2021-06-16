import { setFetching, setSuccess, setFailed } from 'actions/main/main.action'
import { MAIN_URL, CREATE_COMPANY_API } from 'constants/api-route'
import { httpClientPOSTMethodFormData } from 'utils/httpClient.utils'
import {
    MESSAGE_COMPANYCODE_NOTFOUND,
    MESSAGE_COMPANYNAME_NOTFOUND,
    MESSAGE_PRICEOFCARDLOST_NOTFOUND,
    MESSAGE_NOTSELECT_PRO_COMPANY,
    MESSAGE_NOTSELECTIMAGE,
    MESSAGE_FILE_IMAGE_INVALID,
} from 'constants/message.constant'
import swal from 'sweetalert';
import { getExtension, isImage } from "utils/funcImage.utils"

export const CreateCompanyAction = (history, credential, authStore) => {
    return async dispatch => {
        if (createCompanyMiddleware(credential)) {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${CREATE_COMPANY_API}`
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

function createCompanyMiddleware(valuesObj) {
    if (!valuesObj.company_code) {
        swal("Warning!", MESSAGE_COMPANYCODE_NOTFOUND, "warning");
        return false;
    } else if (!valuesObj.company_name) {
        swal("Warning!", MESSAGE_COMPANYNAME_NOTFOUND, "warning");
        return false;
    } else if (!valuesObj.price_of_cardloss) {
        swal("Warning!", MESSAGE_PRICEOFCARDLOST_NOTFOUND, "warning");
        return false;
    } else if (!valuesObj.company_promotion) {
        swal("Warning!", MESSAGE_NOTSELECT_PRO_COMPANY, "warning");
        return false;
    } else if (!valuesObj.image) {
        swal("Warning!", MESSAGE_NOTSELECTIMAGE, "warning");
        return false;
    }else if(!isImage(getExtension(valuesObj.image.name))){
        swal("Warning!", MESSAGE_FILE_IMAGE_INVALID, "warning");
        return false;
    }
    return true;
}

function refreshPage() {
    window.location.reload(false);
}
