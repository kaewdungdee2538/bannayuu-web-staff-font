import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { checkJWTTOKENAction } from "actions/main/main.action"
import { useSelector } from 'react-redux'
import { ImportExcelHomeAction } from "actions/home/home-import-excel.action"
import { setClearHomeAll } from "actions/home/home-get-all.action"
import { styles } from '../main/Home-main-style'
import { modalStyle } from 'utils/modalStyle.utils'
import { useStylesExcelArea } from './Home-import-style'
import ExcelFormMaterialUi from 'components/Excel/ExcelFormMaterialUi'
import swal from 'sweetalert';
import {
    MESSAGE_EXCELROW_NOTFOUND,
    MESSAGE_EXCELCOLUMN_NOTCOMPLETE
} from 'constants/message.constant'
import Spreadsheet from "react-spreadsheet";

const useStyles = makeStyles(styles);

function HomeImportData() {
    const classes = useStyles();
    const classesModal = modalStyle();
    const classesExcel = useStylesExcelArea();
    const Store = useSelector(store => store);
    const dispatch = useDispatch();
    const history = useHistory();
    const [excelItems, setExcelItems] = useState([]);

    //---------------------on load
    useEffect(() => {
        loadHomeImportExcelForm();
    }, []);
    async function loadHomeImportExcelForm() {
        const authStore = Store.loginReducer.result;
        if (!authStore) {
            history.push("/login");
        } else {
            if (!Store.homeImportExcelReducer.result) {
                history.push("/admin/home-main");
            } else {
                dispatch(checkJWTTOKENAction(history, Store));
                dispatch(setClearHomeAll());
            }
        }
    }
    let formExcelElem = null;
    if (excelItems.length > 0) {

        formExcelElem = <div className={classesExcel.excelArea}><Spreadsheet data={excelItems} /></div>

    }

    //-------------------On Upload
    function onUploadClick() {
        if (checkRow()) {
            if (checkColum()) {
                uploadData();
            } else swal("Warning!", `${MESSAGE_EXCELCOLUMN_NOTCOMPLETE} จำนวนคอลัมน์จะต้องมี 2-4 เท่านั้น`, "warning");
        } else swal("Warning!", MESSAGE_EXCELROW_NOTFOUND, "warning");
    }
    function checkRow() {
        if (excelItems.length <= 1)
            return false;
        return true;
    }
    function checkColum() {
        const filterColumns = excelItems.find(item => {
            return item.length > 4 || item.length < 2
        });
        if (filterColumns) return false;
        return true;
    }
    function uploadData() {
        const homeImportReducer = Store.homeImportExcelReducer.result;
        let itemFromExcel = [...excelItems];
        itemFromExcel.shift();
        const valueObj = {
            company_id: homeImportReducer.company_id,
            data: itemFromExcel
        }
        dispatch(ImportExcelHomeAction(history, valueObj, Store.loginReducer.result));
    }
    //----------------On go to Home list 
    function onGotoHomeListClick() {
        history.push('/admin/home-list')
    }
    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color="success">
                            <h4 className={classes.cardTitleWhite}>Import Data From Excel For Upload To Home</h4>
                            <p className={classes.cardCategoryWhite}>Import Data From Excel For Upload To Home</p>
                        </CardHeader>
                        <CardBody>
                            <p style={{ color: "#1a237e" }}>เลือกไฟล์ Excel ที่นามสกุลไฟล์เป็น .xlsx เท่านั้น</p>
                            <p style={{ color: "#1a237e" }}>หลังจากเลือกไฟล์ Excel แล้ว ให้ตรวจสอบข้อมูลก่อนว่าครบถ้วน และถูกต้องหรือไม่</p>
                            <p style={{ color: "#1a237e" }}>***หากข้อมูลไม่ครบถ้วน หรือไม่ถูกต้องให้แก้ไขข้อมูลที่ไฟล์ Excel ต้นฉบับก่อน แล้วเลือก Excel (ที่แก้ไขข้อมูลแล้ว) ใหม่อีกครั้ง</p>
                            <p style={{ color: "#1a237e" }}>จากนั้น กดปุ่มอัพโหลดข้อมูลเข้าสู่ระบบ</p>
                            <br></br>
                            <div style={{ textAlign: "end" }}>
                                <Button
                                    color="primary"
                                    size="small"
                                    className={classesModal.btnNextPage}
                                    endIcon={<Icon style={{ fontSize: "25px" }}>keyboard_tab</Icon>}
                                    onClick={onGotoHomeListClick}
                                >
                                    <span>ตรวจสอบข้อมูลบ้าน</span>
                                </Button>
                            </div>
                            <br></br>
                            <ExcelFormMaterialUi setItemExcel={setExcelItems} />
                            <br></br>
                            <div style={{ textAlign: "end" }}>
                                <Button
                                    color="primary"
                                    size="small"
                                    className={classesModal.btnUpload}
                                    endIcon={<Icon style={{ fontSize: "25px" }}>backup</Icon>}
                                    onClick={onUploadClick}
                                >
                                    <span>กดปุ่มอัพโหลดข้อมูลเข้าสู่ระบบ</span>
                                </Button>
                            </div>
                            <br></br>
                            {formExcelElem}
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}


const mapStateToProps = ({ mainReducer, homeImportExcelReducer, homeGetAllReducer }) => ({ mainReducer, homeImportExcelReducer, homeGetAllReducer })

const mapDispatchToProps = {
    ImportExcelHomeAction,
    setClearHomeAll,
    checkJWTTOKENAction
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeImportData);