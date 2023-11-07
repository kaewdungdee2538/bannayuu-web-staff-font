import { setFetching, setSuccess, setFailed } from "actions/main/main.action";
import { MAIN_URL, ADD_SLOT_MANUAL_API } from "constants/api-route";
import { httpClientPOSTMethodVerifyAuth } from "utils/httpClient.utils";
import {
  MESSAGE_COMPANYID_NOTFOUND,
  MESSAGE_SLOT_COUNT_NOT_FOUND,
  MESSAGE_GUARDHOUSE_ID_NOT_FOUND,
  MESSAGE_GUARDHOUSE_CODE_NOT_FOUND,
} from "constants/message.constant";
import swal from "sweetalert";

const AddSlotAction = (history, credential, authStore) => {
  return async (dispatch) => {
    if (addSlotMiddleware(credential)) {
      dispatch(setFetching());
      const urlClient = `${MAIN_URL}${ADD_SLOT_MANUAL_API}`;
      const valuesObj = {
        company_id: credential.company_id,
        slot_count: parseInt(credential.slot_count),
        guardhouse_id: parseInt(credential.guardhouse_id),
        guardhouse_code: credential.guardhouse_code,
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
        swal("Success", result.message, "success").then(() => {
          refreshPage();
        });
      }
    }
  };
};

function addSlotMiddleware(valuesObj) {
  if (!valuesObj.company_id) {
    swal("Warning!", MESSAGE_COMPANYID_NOTFOUND, "warning");
    return false;
  } else if (!valuesObj.guardhouse_id) {
    swal("Warning!", MESSAGE_GUARDHOUSE_ID_NOT_FOUND, "warning");
    return false;
  } else if (!valuesObj.guardhouse_code) {
    swal("Warning!", MESSAGE_GUARDHOUSE_CODE_NOT_FOUND, "warning");
    return false;
  } else if (!valuesObj.slot_count) {
    swal("Warning!", MESSAGE_SLOT_COUNT_NOT_FOUND, "warning");
    return false;
  }
  return true;
}

function refreshPage() {
  window.location.reload(false);
}

export default AddSlotAction;
