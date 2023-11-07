// import { Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector ,connect} from "react-redux";
import {  } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// component
import { DialogModal } from "components/Modal";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
// action
import { AddSlotAction } from "actions/slot/add";
import { modalStyle } from "utils/modalStyle.utils";
// style
import { SlotAddModalStyle } from "./SlotAddStyle";


const useStyles = makeStyles(SlotAddModalStyle);

function SlotAddModal(props) {
  const { open, setOpen } = props;
  const Store = useSelector((state) => state);
  const dispatch = useDispatch();

  const classesModal = modalStyle();
  const classes = useStyles();
  // state
  const [slotInfo, setSlotInfo] = useState({
    slot_count: "",
    guardhouse_id: "",
    guardhouse_code: "",
  });
  //---------------------------------------------------
  function addSlotClick() {
    const company_id = parseInt(Store.companySelectedReducer.result.company_id);
    dispatch(
      AddSlotAction(
        history,
        {
          company_id,
          slot_count: slotInfo.slot_count,
          guardhouse_id: slotInfo.guardhouse_id,
          guardhouse_code: slotInfo.guardhouse_code,
        },
        Store.loginReducer.result
      )
    );
  }
  function cancelClick() {
    setOpen(false);
  }

  //---------------------------------------------------
  return (
    <DialogModal
      open={open}
      setOpen={setOpen}
      title={"เพิ่มจำนวนเลข Slot"}
      subheader={"เพิ่มจำนวนเลข Slot ให้กับโครงการ"}
    >
      <Box className={classes.cardBody}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Guardhouse ID"
              id="guardhouse-id"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                maxLength: "5",

                value: slotInfo.guardhouse_id,
                onChange: (event) =>
                  setSlotInfo({
                    ...slotInfo,
                    guardhouse_id: event.target.value,
                  }),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Guardhouse Code"
              id="guardhouse-code"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                maxLength: "5",

                value: slotInfo.guardhouse_code,
                onChange: (event) =>
                  setSlotInfo({
                    ...slotInfo,
                    guardhouse_code: event.target.value,
                  }),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={3} md={3}>
            <CustomInput
              labelText="จำนวนเลข Slot ที่ต้องการเพิ่ม"
              id="slot-count"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                maxLength: "5",
                type: "number",
                value: slotInfo.slot_count,
                onChange: (event) =>
                  setSlotInfo({
                    ...slotInfo,
                    slot_count: event.target.value,
                  }),
              }}
            />
          </GridItem>
        </GridContainer>

        <br></br>

        <GridContainer>
          <GridItem xs={6} sm={6} md={6}>
            <Button
              color="primary"
              size="small"
              className={classesModal.btnCancel}
              onClick={cancelClick}
            >
              <span>Cancel</span>
            </Button>
          </GridItem>
          <GridItem xs={6} sm={6} md={6} >
            <Button
              color="primary"
              size="small"
              className={classesModal.btnAdd}
              onClick={addSlotClick}
            >
              <span>เพิ่มเลข Slot</span>
            </Button>
          </GridItem>
        </GridContainer>
      </Box>
    </DialogModal>
  );
}

const mapStateToProps = ({AddSlotAction}) => ({AddSlotAction});
  
  const mapDispatchToProps = {AddSlotAction};
  export default connect(mapStateToProps, mapDispatchToProps)(SlotAddModal);
  