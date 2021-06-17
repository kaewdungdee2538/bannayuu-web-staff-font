import { useState, useEffect } from "react"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
// import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead'
import TableCustom from "components/Table/TableCustom"
import Paper from '@material-ui/core/Paper';
import ButtonSearch from 'components/Button/ButtonSearch'
import Icon from '@material-ui/core/Icon';
import { modalStyle } from 'utils/modalStyle.utils'
import { editCompantStyle } from "views/Company/Edit/Company-edit-style"
import { styles } from "views/Company/Add/Company-style"
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux'
import { GetCompanyAllAction } from "actions/company/company-edit.action"
import { headerTable } from 'views/Company/Edit/data/Company-edit-data'

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(editCompantStyle);
//--------Style
const styleTableHeader = {
    backgroundColor: "rgb(144,138,138)",
    color: "white",
    fontSize: 14,
    fontWeight: 600
}

export default function UserChangeCompanyModal(props) {
    const { showModal, setShowModal, setSelectNewCompany } = props
    const classes = useStyles();
    const classes2 = useStyles2();
    const classesModal = modalStyle();
    const scroll = 'paper';
    const Store = useSelector(store => store);
    const dispatch = useDispatch();
    //-------------------State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = calEmptyRows(Store.companyGetAllReducer.result ? Store.companyGetAllReducer.result : 0);
    //---------------------on load
    useEffect(() => {
        loadCompanyEditForm();
    }, []);
    async function loadCompanyEditForm(textSearch) {
        const authStore = Store.loginReducer.result;
        if (!authStore) {
            history.push("/login");
        } else {
            const valuesObj = {
                company_code_or_name: textSearch
            }
            dispatch(GetCompanyAllAction(history, valuesObj, authStore));
        }
    }
    //--------------------Function
    function onCloseModal() {
        setShowModal(false);
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //--------cal Row Height
    function calEmptyRows(rowsLength) {
        return rowsPerPage - Math.min(rowsPerPage, rowsLength - page * rowsPerPage)
    }

    //---------------On Search Click
    function onSearchClick(e) {
        loadCompanyEditForm(e);
    }
    //----------------On Select company
    function onSelectCompay(e) {
        const company_id = e.target.getAttribute("company_id")
        const company_code = e.target.getAttribute("company_code")
        const company_name = e.target.getAttribute("company_name")
        if (company_id) {
            setSelectNewCompany({ company_id, company_code, company_name });
            onCloseModal(false);
        }
    }
    //------------------------------------------------------
    return (
        <Dialog
            open={showModal}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle className={classesModal.headModalEdit} id="scroll-dialog-title">เลือกโครงการใหม่</DialogTitle>
            <DialogContent dividers={scroll === 'paper'} >
                <GridContainer>
                    <CardBody>
                        <ButtonSearch
                            placeholder="รหัสโครงการ/ชื่อโครงการ"
                            searchFunc={e => onSearchClick(e)}
                        />
                        <br></br>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: 80, ...styleTableHeader }} align="left">
                                        </TableCell>
                                        <TableCell style={{ width: 120, ...styleTableHeader }} align="left">
                                            {headerTable.company_code}
                                        </TableCell>
                                        <TableCell style={{ width: 200, ...styleTableHeader }}>
                                            {headerTable.company_name}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? Store.companyGetAllReducer.result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : Store.companyGetAllReducer.result
                                    ).map((row) => (
                                        <TableRow key={row.company_id ? row.company_id : '0'}>
                                            <TableCell style={{ width: 80 }} align="left">
                                                <div className={classes2.tableRowBtn}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        className={classesModal.btnSelect}
                                                        endIcon={<Icon company_id={row.company_id} company_name={row.company_name} company_code={row.company_code}>task_alt</Icon>}
                                                        company_id={row.company_id}
                                                        company_name={row.company_name}
                                                        company_code={row.company_code}
                                                        onClick={onSelectCompay}
                                                    >
                                                        <span company_id={row.company_id} company_name={row.company_name} company_code={row.company_code}>เลือก</span>
                                                    </Button><br></br>

                                                </div>
                                            </TableCell>
                                            <TableCell style={{ width: 120 }} align="left">
                                            <div style={{ maxWidth: 120, overflowX: "auto" }}>
                                                    <span> {row.company_code ? row.company_code : ''}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ width: 300 }} align="left">
                                                <div style={{ maxWidth: 300, overflowX: "auto" }}>
                                                    <span>{row.company_name ? row.company_name : ''}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={3} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter >
                                    <TableRow >
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={Store.companyGetAllReducer.result ? Store.companyGetAllReducer.result.length : 0}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: { 'aria-label': 'rows per page' },
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
                </GridContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseModal}
                    color="primary"
                    className={classesModal.btnCancel}
                >
                    ยกเลิก
                </Button>
            </DialogActions>
        </Dialog>
    )
}