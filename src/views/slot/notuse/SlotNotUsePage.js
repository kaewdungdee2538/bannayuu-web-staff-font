import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
// component
import { useState, useEffect } from "react";
import TableCustom from "components/Table/TableCustom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkJWTTOKENAction } from "actions/main/main.action";
import { useSelector } from "react-redux";
import { GetCompanyAllAction } from "actions/company/company-edit.action";
import {
  setSlotSelectCompanySuccess,
  setSlotClearSelectCompany,
  setClearSlotAll,
  GetSlotNotUseAllAction,
} from "actions/slot/get/slot-get-not-use.controller";
import { GetSlotMaxAction } from "actions/slot/get/slot-get-max.controller";
import { headerSlotNotUseListTable } from "../data/data";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { modalStyle } from "utils/modalStyle.utils";
import { SlotCompantStyle, styles } from "./SlotNotUseStyle";
// modal
import { SlotAddModal } from "views/slot/add";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(SlotCompantStyle);
function SlotNotUsePage() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const classesModal = modalStyle();
  const Store = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();
  const emptyRows = calEmptyRows(
    Store.slotNotUseReducer.result ? Store.slotNotUseReducer.result : 0
  );
  // state
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //---------------------on load
  useEffect(() => {
    loadSlotMainForm();
  }, []);
  async function loadSlotMainForm() {
    
    const authStore = Store.loginReducer.result;
    if (!authStore) {
      history.push("/login");
    } else if (!Store.companySelectedReducer.result) {
      history.push("/slot-main");
    } else {
      const searchObj = {
        company_id: Store.companySelectedReducer.result.company_id,
      };
      dispatch(checkJWTTOKENAction(history, Store));
      dispatch(GetSlotNotUseAllAction(history, searchObj, authStore));
      dispatch(GetSlotMaxAction(history, searchObj, authStore));
    }
  }
  //---------------On Search Click
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //--------cal Row Height
  function calEmptyRows(rowsLength) {
    return rowsPerPage - Math.min(rowsPerPage, rowsLength - page * rowsPerPage);
  }

  //--------Style
  const styleTableHeader = {
    backgroundColor: "rgb(144,138,138)",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
  };
  //--------------Show Modal Edit
  function onShowModal(event) {
    const company_id = event.target.getAttribute("company_id");
    const company_name = event.target.getAttribute("company_name");
    if (company_id) {
      dispatch(setSlotSelectCompanySuccess({ company_id, company_name }));
      history.push("/slot-not-use");
    }
  }
  //--------------Modal create
  function onAddModalClick() {
    setOpen(true);
  }
  //---------------------------------------------------
  //----------------------------------------------------
  return (
    <div>
      <SlotAddModal open={open} setOpen={setOpen}></SlotAddModal>
      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader
              style={{
                background:
                  "linear-gradient(60deg, rgb(181 63 63), rgb(147 40 40))",
              }}
              color="success"
            >
              <h4 className={classes.cardTitleWhite}>
                เลข Slot ที่ยังไม่ถูกใช้งาน
              </h4>
              <p className={classes.cardCategoryWhite}>Slot number not used</p>
            </CardHeader>

            <CardBody>
              <h3>โคงการ {Store?.slotMaxReducer?.result?.company_name}</h3>
              <h4>จำนวนเลข Slot ทั้งหมด</h4>
              <h5>{Store?.slotMaxReducer?.result?.visitor_slot_number}</h5>

              <Button
                color="primary"
                size="small"
                className={classesModal.btnAdd}
                onClick={onAddModalClick}
              >
                <span>เพิ่มเลข Slot</span>
              </Button>

              <br></br>
              <br></br>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  aria-label="custom pagination table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ width: 80, ...styleTableHeader }}
                        align="left"
                      ></TableCell>
                      <TableCell
                        style={{ width: 160, ...styleTableHeader }}
                        align="left"
                      >
                        {headerSlotNotUseListTable.visitor_slot_number}
                      </TableCell>
                      <TableCell style={{ ...styleTableHeader }}>
                        {headerSlotNotUseListTable.company_name}
                      </TableCell>
                      <TableCell
                        style={{ width: 120, ...styleTableHeader }}
                        align="left"
                      >
                        {headerSlotNotUseListTable.use_status}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? Store.slotNotUseReducer.result.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : Store.slotNotUseReducer.result
                    ).map((row) => (
                      <TableRow
                        key={row.visitor_slot_id ? row.visitor_slot_id : "0"}
                      >
                        <TableCell style={{ width: 80 }} align="left">
                          <div className={classes2.tableRowBtn}>
                            <Button
                              color="primary"
                              size="small"
                              className={classesModal.btnSelect}
                              endIcon={
                                <Icon
                                  visitor_slot_id={row.visitor_slot_id}
                                  visitor_slot_number={row.visitor_slot_number}
                                >
                                  pin_end
                                </Icon>
                              }
                              visitor_slot_id={row.visitor_slot_id}
                              visitor_slot_number={row.visitor_slot_number}
                              onClick={onShowModal}
                            >
                              <span
                                visitor_slot_id={row.visitor_slot_id}
                                visitor_slot_number={row.visitor_slot_number}
                              >
                                เลือก
                              </span>
                            </Button>
                            <br></br>
                          </div>
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="left">
                          {row.visitor_slot_number
                            ? row.visitor_slot_number
                            : ""}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.company_name ? row.company_name : ""}
                        </TableCell>
                        <TableCell style={{ width: 120 }} align="left">
                          {row.use_status ? "ใช้งาน" : "ว่าง"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={3}
                        count={
                          Store.slotNotUseReducer.result
                            ? Store.slotNotUseReducer.result.length
                            : 0
                        }
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { "aria-label": "rows per page" },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TableCustom}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = ({
  mainReducer,
  companyGetAllReducer,
  villagerImportExcelReducer,
  villagerGetAllReducer,
}) => ({
  mainReducer,
  companyGetAllReducer,
  villagerImportExcelReducer,
  villagerGetAllReducer,
});

const mapDispatchToProps = {
  setSlotSelectCompanySuccess,
  GetCompanyAllAction,
  setSlotClearSelectCompany,
  setClearSlotAll,
  checkJWTTOKENAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(SlotNotUsePage);
