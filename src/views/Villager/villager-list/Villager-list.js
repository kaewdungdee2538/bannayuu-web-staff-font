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
import { GetVillagerAllAction } from "actions/villager/villager-get-all.action"
import { headerVillagerListTable } from '../data/Villager-data'
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
import ButtonSearch from 'components/Button/ButtonSearch'
// import { modalStyle } from 'utils/modalStyle.utils'
import {
    // homeCompantStyle,
    styles
} from '../main/Villager-main-style'

const useStyles = makeStyles(styles);
// const useStyles2 = makeStyles(homeCompantStyle);
function VillagerList() {
    const classes = useStyles();
    // const classes2 = useStyles2();
    // const classesModal = modalStyle();
    const Store = useSelector(store => store);
    const dispatch = useDispatch();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = calEmptyRows(Store.villagerGetAllReducer.result ? Store.villagerGetAllReducer.result : 0);
    //---------------------on load
    useEffect(() => {
        loadVillagerMainForm();
    }, []);
    async function loadVillagerMainForm(textSearch) {
        const authStore = Store.loginReducer.result;
        if (!authStore) {
            history.push("/login");
        } else {
            if (!Store.villagerImportExcelReducer.result) {
                history.push("/villager-main");
            } else {
                const result = Store.villagerImportExcelReducer.result
                const valuesObj = {
                    company_id: result.company_id,
                    home_address: textSearch
                }
                dispatch(checkJWTTOKENAction(history, Store));
                dispatch(GetVillagerAllAction(history, valuesObj, authStore));
            }
        }
    }
    //---------------On Search Click
    function onSearchClick(e) {
        loadVillagerMainForm(e);
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

    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #3f51b5, #283593)" }} color="success">
                            <h4 className={classes.cardTitleWhite}>ตารางข้อมูลลูกบ้านของโครงการ {Store.villagerGetAllReducer.result ? Store.villagerGetAllReducer.result.company_name : ""}</h4>
                            <p className={classes.cardCategoryWhite}>Villager List Table</p>
                        </CardHeader>

                        <CardBody>
                            <ButtonSearch
                                placeholder="บ้านเลขที่"
                                searchFunc={e => onSearchClick(e)}
                            />
                            <br></br>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="custom pagination table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: 180, ...styleTableHeader }} align="left">
                                                {headerVillagerListTable.villager_code}
                                            </TableCell>
                                            <TableCell style={{ width: 160, ...styleTableHeader }} align="left">
                                                {headerVillagerListTable.home_address}
                                            </TableCell>
                                            <TableCell style={{ ...styleTableHeader }}>
                                                {headerVillagerListTable.full_name}
                                            </TableCell>
                                            <TableCell style={{ width: 160, ...styleTableHeader }} align="left">
                                                {headerVillagerListTable.tel_number}
                                            </TableCell>
                                            <TableCell style={{ width: 120, ...styleTableHeader }} align="left">
                                                {headerVillagerListTable.status}
                                            </TableCell>
                                        </TableRow>   
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? Store.villagerGetAllReducer.result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : Store.villagerGetAllReducer.result
                                        ).map((row) => (
                                            <TableRow key={row.villager_id ? row.villager_id : '0'}>
                                                <TableCell style={{ width: 180 }} align="left">
                                                    {row.villager_code ? row.villager_code : ''}
                                                </TableCell>
                                                <TableCell style={{ width: 160 }} align="left">
                                                    {row.home_address ? row.home_address : ''}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.home_address ? `${row.first_name} ${row.last_name}` : ''}
                                                </TableCell>
                                                <TableCell style={{ width: 160 }} align="left">
                                                    {row.tel_number ? row.tel_number : ''}
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
                                                count={Store.villagerGetAllReducer.result ? Store.villagerGetAllReducer.result.length : 0}
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


const mapStateToProps = ({ mainReducer, villagerGetAllReducer }) => ({ mainReducer, villagerGetAllReducer })

const mapDispatchToProps = {
    GetVillagerAllAction,
    checkJWTTOKENAction
}
export default connect(mapStateToProps, mapDispatchToProps)(VillagerList);