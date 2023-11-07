import { setFetching, setSuccess, setFailed } from "actions/main/main.action";
import { MAIN_URL, DISABLE_VILLAGER_API } from "constants/api-route";
import { httpClientPOSTMethodVerifyAuth } from "utils/httpClient.utils";
import {
    MESSAGE_HOME_LINE_ID_NOT_FOUND,
} from "constants/message.constant";
import swal from "sweetalert";

const DisableVillagerAction = (credential, authStore,refreshFunc) => {
  return async (dispatch) => {
    if (disableVillagerMiddleware(credential)) {
      dispatch(setFetching());
      const urlClient = `${MAIN_URL}${DISABLE_VILLAGER_API}`;
      const valuesObj = {
        home_line_id: parseInt(credential.home_line_id),
      };
      const result = await httpClientPOSTMethodVerifyAuth({
        urlClient,
        valuesObj,
        authStore,
      });
      if (result.error) {
        dispatch(setFailed());
        swal("Warning!", result.message, "warning");
      } else {
        dispatch(setSuccess());
        swal("Success", "ปิดสถานะสำเร็จ", "success").then(() => {
            refreshFunc();
        });
      }
    }
  };
};

function disableVillagerMiddleware(valuesObj) {
  if (!valuesObj.home_line_id) {
    swal("Warning!", MESSAGE_HOME_LINE_ID_NOT_FOUND, "warning");
    return false;
  } 
  return true;
}

export default DisableVillagerAction;
