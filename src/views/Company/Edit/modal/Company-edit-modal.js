import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import { GetCompanyByID } from 'actions/company/company-edit.action'
import DialogTitle from '@material-ui/core/DialogTitle';
import CompanyEditModalInfo from './Company-edit-modal-info'
import CompanyEditModalDisable from './Company-edit-modal-disable'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import { modalStyle } from 'utils/modalStyle.utils'
import moment from "moment";
import { EditCompanyAction } from 'actions/company/company-edit.action'
import { DisableCompanyAction } from 'actions/company/company-disable.action'
import { EnableCompanyAction } from 'actions/company/company-enable.action'

function CompanyEditModal(props) {
    const { showModal, setShowModal, valuesObj } = props
    const scroll = 'paper';
    const dispatch = useDispatch();
    const history = useHistory();
    const Store = useSelector(state => state)
    const classes = modalStyle();
    //----------State
    const [companyInfo, setCompanyInfo] = useState({
        company_id: "",
        company_code: "",
        company_name: "",
        company_promotion: "",
        status: "DISABLE",
        company_start_date: "",
        company_expire_date: "",
        company_remark: "",
        create_by: "",
        create_date: "",
        update_by: "",
        update_date: "",
        delete_by: "",
        delete_date: "",
        calculate_enable: false,
        price_of_cardloss: "0",
        except_time_split_from_day: false,
        line_company_data :""
    })
    //----------Set default value
    const dStart = moment();
    const dEnd = moment().add(30, 'days');
    const [showFormInfo, setShowFormInfo] = useState(true);
    const [showFormDisable, setShowFormDisable] = useState(false);
    const [showFormEnable, setShowFormEnable] = useState(false);
    const [headerTextModal, setHeaderTextModal] = useState("แก้ไขข้อมูลโครงการ");
    //-------------------
    const [checkCal, setCheckCal] = useState(false);
    const [checkSecureEstampVisitor, setCheckSecureEstampVisitor] = useState(false);
    const [checkSecureEstampBooking, setCheckSecureEstampBooking] = useState(false);
    const [promotion, setPromotion] = useState("");
    //----------State
    const [dateStart, setDateStart] = useState(dStart);
    const [dateEnd, setDateEnd] = useState(dEnd);
    const [image, setImage] = useState(null);
    const [remark, setRemark] = useState("")
    const [lineConfig, setLineConfig] = useState("");
    const [selectExceptDay, setSelectExceptDay] = useState("true");
    //-----------------Form load
    useEffect(() => {
        loadEditForm();
    }, []);
    async function loadEditForm() {
        const authStore = Store.loginReducer.result;
        if (!authStore) {
            history.push("/login");
        } else {
            const values = {
                company_id: parseInt(valuesObj)
            }
            const getData = await GetCompanyByID(dispatch, values, authStore)
            if (getData.error) {
                swal("Warning!", getData.message, "warning");
            } else {
                const result = getData.result;
                console.log(result)
                setCompanyInfo(result)
                setCheckCal(result.calculate_enable);
                setCheckSecureEstampVisitor(result.visitor_estamp_verify);
                setCheckSecureEstampBooking(result.booking_estamp_verify);
                setPromotion(result.company_promotion)
                setDateStart(result.company_start_date ? result.company_start_date : dStart)
                setDateEnd(result.company_expire_date ? result.company_expire_date : dEnd)
                setSelectExceptDay(result.except_time_split_from_day.toString())
                setLineConfig(JSON.stringify(result.line_company_data))
            }
        }
    }

    //----------------On Create
    function onEditClick() {
        dispatch(EditCompanyAction(history, {
            company_id: companyInfo.company_id.toString(),
            company_code: companyInfo.company_code,
            company_name: companyInfo.company_name,
            price_of_cardloss: companyInfo.price_of_cardloss.toString(),
            company_start_date: moment(dateStart).set({ hour: 0, minute: 0, second: 0 }).format("yyyy-MM-DD HH:mm:ss"),
            company_expire_date: moment(dateEnd).set({ hour: 0, minute: 0, second: 0 }).format("yyyy-MM-DD HH:mm:ss"),
            company_promotion: promotion,
            calculate_enable: checkCal,
            except_time_split_from_day: selectExceptDay === "true" ? true : false,
            image,
            remark,
            booking_estamp_verify: checkSecureEstampBooking,
            visitor_estamp_verify: checkSecureEstampVisitor,
            line_company_data: lineConfig
        }, Store.loginReducer.result))
    }
    //---------------On Disable 
    function onDisableClick() {
        dispatch(DisableCompanyAction(history, {
            company_id: companyInfo.company_id.toString(),
            image,
            remark
        }, Store.loginReducer.result))
    }
    //---------------On Enable
    function onEnableClick() {
        dispatch(EnableCompanyAction(history, {
            company_id: companyInfo.company_id.toString(),
            image,
            remark
        }, Store.loginReducer.result))
    }
    function onCloseModal() {
        setShowModal(false);
    }
    //------------btn disable
    let btnDisableElem = null;
    let btnEditSaveElem = null;
    let btnEnableElem = null;
    if (companyInfo.status.toUpperCase() !== 'DISABLE') {
        btnDisableElem = <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<Icon>remove_circle</Icon>}
            onClick={() => { setShowFormInfo(false); setShowFormDisable(true); setHeaderTextModal("ระงับการใช้งานโครงการ"); }}
        >
            ระงับการใช้งาน
        </Button>
        btnEditSaveElem = <Button onClick={onEditClick}
            color="primary"
            className={classes.btnSave}
            endIcon={<Icon>save</Icon>}
        >
            แก้ไขข้อมูล
        </Button>
    } else {
        btnEnableElem = <Button
            className={classes.btnEnable}
            endIcon={<Icon>history</Icon>}
            onClick={() => { setShowFormInfo(false); setShowFormEnable(true); setHeaderTextModal("เปิดให้บริการโครงการใหม่อีกครั้ง"); }}
        >
            เปิดให้บริการใหม่
        </Button>
    }
    //----------------Show Form Info
    let formInfoElem = null;
    let formBottomElemInfo = null;
    if (showFormInfo) {
        formInfoElem = <CompanyEditModalInfo
            companyInfo={companyInfo}
            onCloseModal={onCloseModal}
            setCompanyInfo={setCompanyInfo}
            setShowFormInfo={setShowFormInfo}
            checkCal={checkCal}
            setCheckCal={setCheckCal}
            checkSecureEstampVisitor={checkSecureEstampVisitor}
            setCheckSecureEstampVisitor={setCheckSecureEstampVisitor}
            checkSecureEstampBooking={checkSecureEstampBooking}
            setCheckSecureEstampBooking={setCheckSecureEstampBooking}
            promotion={promotion}
            setPromotion={setPromotion}
            setImage={setImage}
            remark={remark}
            setRemark={setRemark}
            selectExceptDay={selectExceptDay}
            setSelectExceptDay={setSelectExceptDay}
            setDateStart={setDateStart}
            setDateEnd={setDateEnd}
            dateStart={dateStart}
            dateEnd={dateEnd}
            setLineConfig={setLineConfig}
            lineConfig={lineConfig}
        />
        formBottomElemInfo = <DialogActions>
            {btnEnableElem}
            {btnDisableElem}
            {btnEditSaveElem}
            <Button onClick={onCloseModal}
                color="primary"
                className={classes.btnCancel}
            >
                ยกเลิก
            </Button>
        </DialogActions>
    }
    //--------------Show Form Disable
    let formDisableElem = null;
    let formBottomElemDisable = null;
    if (showFormDisable) {
        formDisableElem = <CompanyEditModalDisable
            setImage={setImage}
            remark={remark}
            setRemark={setRemark}
        />
        formBottomElemDisable = <DialogActions>
            <Button onClick={onDisableClick}
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<Icon>save</Icon>}
            >
                ระงับโครงการ
            </Button>
            <Button onClick={onCloseModal}
                color="primary"
                className={classes.btnCancel}
            >
                ยกเลิก
            </Button>
        </DialogActions>
    }
    //-------------Show Form Enable
    let formEnableElem = null;
    let formBottomElemEnable = null;
    if (showFormEnable) {
        formEnableElem = <CompanyEditModalDisable
            setImage={setImage}
            remark={remark}
            setRemark={setRemark}
        />
        formBottomElemEnable = <DialogActions>
            <Button onClick={onEnableClick}
                className={classes.btnEnable}
                endIcon={<Icon>save</Icon>}
            >
                เปิดให้บริการใหม่
            </Button>
            <Button onClick={onCloseModal}
                color="primary"
                className={classes.btnCancel}
            >
                ยกเลิก
            </Button>
        </DialogActions>
    }
    //-------------------------------------
    return (
        <Dialog
            open={showModal}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle className={classes.headModalEdit} id="scroll-dialog-title">{headerTextModal}</DialogTitle>
            <DialogContent>
                {formInfoElem}
                {formDisableElem}
                {formEnableElem}
            </DialogContent>
            {formBottomElemInfo}
            {formBottomElemDisable}
            {formBottomElemEnable}
        </Dialog>
    )
}

export default CompanyEditModal;