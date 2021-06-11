import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Button from "components/CustomButtons/Button.js";
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
// import { addRow } from "./Company-edit-data"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { checkJWTTOKENAction } from "actions/main/main.action"
import { useSelector } from 'react-redux'
import { GetCompanyAllAction } from "actions/company/company-edit.action"
import { setVillagerClearSelectCompany, setVillagerSelectCompanySuccess } from "actions/villager/villager-import-excel.action"
import { setClearVillagerAll } from "actions/villager/villager-get-all.action"
import { headerTable } from '../data/Villager-data'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ButtonSearch from 'components/Button/ButtonSearch'
import { modalStyle } from 'utils/modalStyle.utils'
import { villagerCompantStyle, styles } from './Villager-main-style'

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(villagerCompantStyle);
function VillagerMain() {
    const classes = useStyles();
    const classes2 = useStyles2();
    const classesModal = modalStyle();
    const Store = useSelector(store => store);
    const dispatch = useDispatch();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = calEmptyRows(Store.companyGetAllReducer.result ? Store.companyGetAllReducer.result : 0);
    //---------------------on load
    useEffect(() => {
        loadHomeMainForm();
    }, []);
    async function loadHomeMainForm(textSearch) {
        const authStore = Store.loginReducer.result;
        if (!authStore) {
            history.push("/login");
        } else {
            const valuesObj = {
                company_code_or_name: textSearch
            }
            dispatch(setVillagerClearSelectCompany());
            dispatch(setClearVillagerAll());
            dispatch(checkJWTTOKENAction(history, Store));
            dispatch(GetCompanyAllAction(history, valuesObj, authStore));
        }
    }
    //---------------On Search Click
    function onSearchClick(e) {
        loadHomeMainForm(e);
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
        const company_id = event.target.getAttribute("company_id")
        const company_name = event.target.getAttribute("company_name")
        if (company_id) {
            dispatch(setVillagerSelectCompanySuccess({ company_id, company_name }))
            history.push("/admin/villager-import");
        }
    }
    //--------------Modal edit

    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #3f51b5, #283593)" }} color="success" >
                            <h4 className={classes.cardTitleWhite}>โครงการในระบบ (Import Villager From Excel)</h4>
                            <p className={classes.cardCategoryWhite}>Company List Table</p>
                        </CardHeader>

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
                                            <TableCell style={{ width: 160, ...styleTableHeader }} align="left">
                                                {headerTable.company_code}
                                            </TableCell>
                                            <TableCell style={{ ...styleTableHeader }}>
                                                {headerTable.company_name}
                                            </TableCell>
                                            <TableCell style={{ width: 120, ...styleTableHeader }} align="left">
                                                {headerTable.company_promotion}
                                            </TableCell>
                                            <TableCell style={{ width: 120, ...styleTableHeader }} align="left">
                                                {headerTable.status}
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
                                                            color="primary"
                                                            size="small"
                                                            className={classesModal.btnSelect}
                                                            endIcon={<Icon company_id={row.company_id} company_name={row.company_name}>pin_end</Icon>}
                                                            company_id={row.company_id}
                                                            company_name={row.company_name}
                                                            onClick={onShowModal}
                                                        >
                                                            <span company_id={row.company_id} company_name={row.company_name}>เลือก</span>
                                                        </Button><br></br>

                                                    </div>
                                                </TableCell>
                                                <TableCell style={{ width: 160 }} align="left">
                                                    {row.company_code ? row.company_code : ''}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.company_name ? row.company_name : ''}
                                                </TableCell>
                                                <TableCell style={{ width: 120 }} align="left">
                                                    {row.company_promotion ? row.company_promotion : ''}
                                                </TableCell>
                                                <TableCell style={{ width: 120 }} align="left">
                                                    {row.status ? row.status : ''}
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
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}


const mapStateToProps = ({ mainReducer, companyGetAllReducer, villagerImportExcelReducer, villagerGetAllReducer }) => ({ mainReducer, companyGetAllReducer, villagerImportExcelReducer, villagerGetAllReducer })

const mapDispatchToProps = {
    setVillagerClearSelectCompany,
    GetCompanyAllAction,
    setVillagerSelectCompanySuccess,
    setClearVillagerAll,
    checkJWTTOKENAction
}
export default connect(mapStateToProps, mapDispatchToProps)(VillagerMain);