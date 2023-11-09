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
import { GetHomeAllAction } from "actions/home/home-get-all.action"
import { headerHomeListTable } from '../data/Home-data'
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
import ButtonSearch from 'components/Button/ButtonSearch'
// import { modalStyle } from 'utils/modalStyle.utils'
import {
    // homeCompantStyle,
    styles
} from '../main/Home-main-style'
// excel
import Excel from "../excel/ExportExcel";

const header = {
    reportName: "ข้อมูลบ้านเลขที่",
  };

const useStyles = makeStyles(styles);
// const useStyles2 = makeStyles(homeCompantStyle);
function HomeList() {
    const classes = useStyles();
    // const classes2 = useStyles2();
    // const classesModal = modalStyle();
    const Store = useSelector(store => store);
    const dispatch = useDispatch();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const emptyRows = calEmptyRows(Store.homeGetAllReducer.result ? Store.homeGetAllReducer.result : 0);
    //---------------------on load
    useEffect(() => {
        loadHomeMainForm();
    }, []);
    async function loadHomeMainForm(textSearch) {
        const authStore = Store.loginReducer.result;
        if (!authStore) {
            history.push("/login");
        } else {
            if (!Store.homeImportExcelReducer.result) {
                history.push("/home-main");
            } else {
                const result = Store.homeImportExcelReducer.result
                const valuesObj = {
                    company_id: result.company_id,
                    home_address: textSearch
                }
                dispatch(checkJWTTOKENAction(history, Store));
                dispatch(GetHomeAllAction(history, valuesObj, authStore));
            }
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

    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>ตารางบ้านเลขที่ของโครงการ {Store.homeImportExcelReducer.result ? Store.homeImportExcelReducer.result.company_name : ""}</h4>
                            <p className={classes.cardCategoryWhite}>Home List Table</p>
                        </CardHeader>

                        <CardBody>
                            <ButtonSearch
                                placeholder="บ้านเลขที่"
                                searchFunc={e => onSearchClick(e)}
                            />
                              <br></br>
              {Store.homeGetAllReducer.result &&
                Array.isArray(Store.homeGetAllReducer.result) &&
                Store.homeGetAllReducer.result.length > 0 && (
                  <Excel
                    headers={header}
                    values={Store.homeGetAllReducer.result}
                  />
                )}
              <br></br>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="custom pagination table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: 160, ...styleTableHeader }} align="left">
                                                {headerHomeListTable.home_code}
                                            </TableCell>
                                            <TableCell style={{ ...styleTableHeader }}>
                                                {headerHomeListTable.home_address}
                                            </TableCell>
                                            <TableCell style={{ width: 120, ...styleTableHeader }} align="left">
                                                {headerHomeListTable.status}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? Store.homeGetAllReducer.result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : Store.homeGetAllReducer.result
                                        ).map((row) => (
                                            <TableRow key={row.home_id ? row.home_id : '0'}>
                                                <TableCell style={{ width: 160 }} align="left">
                                                    {row.home_code ? row.home_code : ''}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.home_address ? row.home_address : ''}
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
                                                count={Store.homeGetAllReducer.result ? Store.homeGetAllReducer.result.length : 0}
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


const mapStateToProps = ({ mainReducer, homeGetAllReducer }) => ({ mainReducer, homeGetAllReducer })

const mapDispatchToProps = {
    GetHomeAllAction,
    checkJWTTOKENAction
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeList);