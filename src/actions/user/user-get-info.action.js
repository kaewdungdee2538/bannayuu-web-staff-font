import { MAIN_URL, GET_USER_BYID_API } from 'constants/api-route'
import { httpClientGetMethodWithPost } from 'utils/httpClient.utils'

import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
export async function GetUserByID(dispatch, credential, authStore) {
    dispatch(setFetching());
    const urlClient = `${MAIN_URL}${GET_USER_BYID_API}`
    const valuesObj = { ...credential }
    const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
    if (result.error) {
        dispatch(setFailed());
    } else
        dispatch(setSuccess());
    return result;
}
