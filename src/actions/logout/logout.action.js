import {
    HTTP_LOGOUT_FETCHING,
    HTTP_LOGOUT_SUCCESS,
} from '../../constants/constants.utils'
export const setLogoutFetching = () => ({
    type: HTTP_LOGOUT_FETCHING
})

export const setLogoutSuccess = () => ({
    type: HTTP_LOGOUT_SUCCESS
})


export const logoutAction = (history) => {
    return async dispatch => {
        dispatch(setLogoutFetching());
        history.push('/login');
        dispatch(setLogoutSuccess())
    }
}




