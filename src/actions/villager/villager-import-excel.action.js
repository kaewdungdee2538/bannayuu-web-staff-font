import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_VILLAGER_SELECT_COMPANY_SUCCESS,
    HTTP_VILLAGER_CLEAR_COMPANY,
} from 'constants/constants.utils'

import { MAIN_URL, IMPORT_EXCEL_VILLAGER_API } from 'constants/api-route'
import { httpClientPOSTMethodVerifyAuth } from 'utils/httpClient.utils'

export const setVillagerSelectCompanySuccess = (payload) => ({
    type: HTTP_VILLAGER_SELECT_COMPANY_SUCCESS,
    payload
})

export const setVillagerClearSelectCompany = () => ({
    type: HTTP_VILLAGER_CLEAR_COMPANY
})


export const ImportExcelVillagerAction = (history, credential, authStore) => {
    return async dispatch => {
        dispatch(setFetching());
        const urlClient = `${MAIN_URL}${IMPORT_EXCEL_VILLAGER_API}`
        const newCredential = { ...credential }
        let items = newCredential.data;
        const newItems = items.map(item => {
            return {
                home_address: item[0].value,
                first_name: item[1].value,
                last_name: item[2].value,
                tel_number: item[3].value,
                remark: item[4].value
            }
        })
        const valuesObj = {
            company_id: newCredential.company_id,
            data: newItems
        }
        const result = await httpClientPOSTMethodVerifyAuth({ urlClient, valuesObj, authStore })
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

function refreshPage() {
    window.location.reload(false);
}

