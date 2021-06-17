import { styles } from "views/Company/Add/Company-style"
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react'
import TableCustom from "components/Table/TableCustom"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { checkJWTTOKENAction } from "actions/main/main.action"
import { useSelector } from 'react-redux'
import { GetCompanyListAllAction } from "actions/user/user-get-list.action"
import { setSelectUserSuccess,setClearSelectUser } from 'actions/user/user-select.action'
import { userHeaderTable } from 'views/user/data/User.data'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ButtonSearch from 'components/Button/ButtonSearch'
import { editCompantStyle } from "views/Company/Edit/Company-edit-style"

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(editCompantStyle);
function UserAddOrDeleteListCompanyList() {
    const classes = useStyles();
    const classes2 = useStyles2();
    const Store = useSelector(store => store);
    const dispatch = useDispatch();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = calEmptyRows(Store.userListGetAllReducer.result ? Store.userListGetAllReducer.result : 0);

    //---------------------on load
    useEffect(() => {
        loadAddOrDeleteCompanyForm();
    }, []);
    async function loadAddOrDeleteCompanyForm(textSearch) {
        const authStore = Store.loginReducer.result;
        console.log(authStore)
        if (!authStore) {
            history.push("/login");
        } else {
            if (Store.companySelectedReducer.result) {
                const valuesObj = {
                    company_id: Store.companySelectedReducer.result.company_id,
                    full_name: textSearch
                }
                dispatch(setClearSelectUser());
                dispatch(checkJWTTOKENAction(history, Store));
                dispatch(GetCompanyListAllAction(history, valuesObj, authStore));
            } else {
                history.push("/admin/user-addordelete-listcompany-select");
            }

        }
    }
    //---------------On Search Click
    function onSearchClick(e) {
        loadAddOrDeleteCompanyForm(e);
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

    //--------Style
    const styleTableHeader = {
        backgroundColor: "rgb(144,138,138)",
        color: "white",
        fontSize: 14,
        fontWeight: 600
    }
    //--------------Show Modal Edit
    function onShowModal(event) {
        const employee_id = event.target.getAttribute("employee_id")
        if(employee_id){
            dispatch(setSelectUserSuccess({employee_id}))
            history.push("/admin/user-addordelete-listcompany")
        }
    }

    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #007bff, #1e88e5)" }} color="primary">
                        <h4 className={classes.cardTitleWhite}>เลือก User เพื่อเข้าไป เพิ่ม/ลด โครงการในการดูแลผู้ใช้งาน</h4>
                            <p className={classes.cardCategoryWhite}>Select user for add/delete comapny list</p>
                        </CardHeader>

                        <CardBody>
                            <ButtonSearch
                                placeholder="ชื่อ/นามสกุล"
                                searchFunc={e => onSearchClick(e)}
                            />
                            <br></br>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="custom pagination table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: 80, ...styleTableHeader }} align="left">
                                            </TableCell>
                                            <TableCell style={{ width: 160, ...styleTableHeader }} align="left">
                                                {userHeaderTable.username}
                                            </TableCell>
                                            <TableCell style={{ ...styleTableHeader }}>
                                                {userHeaderTable.first_name_th}
                                            </TableCell>
                                            <TableCell style={{ ...styleTableHeader }}>
                                                {userHeaderTable.last_name_th}
                                            </TableCell>
                                            <TableCell style={{ width: 120, ...styleTableHeader }} align="left">
                                                {userHeaderTable.employee_privilege_type}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? Store.userListGetAllReducer.result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : Store.userListGetAllReducer.result
                                        ).map((row) => (
                                            <TableRow key={row.employee_id ? row.employee_id : '0'}>
                                                <TableCell style={{ width: 80 }} align="left">
                                                    <div className={classes2.tableRowBtn}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            className={classes.button}
                                                            endIcon={<Icon employee_id={row.employee_id}>create</Icon>}
                                                            employee_id={row.employee_id}
                                                            onClick={onShowModal}
                                                        >
                                                            <span employee_id={row.employee_id}>แก้ไข</span>
                                                        </Button><br></br>

                                                    </div>
                                                </TableCell>
                                                <TableCell style={{ width: 160 }} align="left">
                                                    {row.username ? row.username : ''}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.first_name_th ? row.first_name_th : ''}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.last_name_th ? row.last_name_th : ''}
                                                </TableCell>
                                                <TableCell style={{ width: 120 }} align="left">
                                                    {row.employee_privilege_type ? row.employee_privilege_type : ''}
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
                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                colSpan={3}
                                                count={Store.userListGetAllReducer.result ? Store.userListGetAllReducer.result.length : 0}
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
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}


const mapStateToProps = ({ mainReducer, userListGetAllReducer }) => ({ mainReducer, userListGetAllReducer })

const mapDispatchToProps = {
    GetCompanyListAllAction,
    checkJWTTOKENAction
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAddOrDeleteListCompanyList);