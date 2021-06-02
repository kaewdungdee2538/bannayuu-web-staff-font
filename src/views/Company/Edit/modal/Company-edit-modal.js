import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { modalStyle } from 'utils/modalStyle.utils'
import Icon from '@material-ui/core/Icon';
import moment from "moment";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DateMaterialUi from "components/DateTime/DateMaterialUi"
import SelectBox from "components/Select/SelectBox"
import CheckBox from "components/CheckBox/CheckBox"
import RadioBox from "components/RadioBox/RadioBox"
import InputFile from "components/Input/InputFile"
import CardIcon from "components/Card/CardIcon.js";
import TextField from '@material-ui/core/TextField';
import AvatarForm from "components/Avatar/Avatar-form"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
// import { checkJWTTOKENAction } from "actions/main/main.action"
import { itemSelectBoxs, itemRadioBoxs, getStatus } from "../data/Company-edit-data"
import { GetCompanyByID, EditCompanyAction } from 'actions/company/company-edit.action'

import swal from 'sweetalert';

function CompanyEditModal(props) {
    const { showModal, setShowModal, valuesObj } = props
    const scroll = 'paper';
    const classes = modalStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const Store = useSelector(state => state)
    //----------Set default value
    const dStart = moment();
    const dEnd = moment().add(30, 'days');
    //----------State
    const [dateStart, setDateStart] = useState(dStart);
    const [dateEnd, setDateEnd] = useState(dEnd);
    const [promotion, setPromotion] = useState("");
    const [checkCal, setCheckCal] = useState(false);
    const [selectExceptDay, setSelectExceptDay] = useState("true");
    const [image, setImage] = useState(null);
    const [remark, setRemark] = useState("")
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
        calculate_enable: true,
        price_of_cardloss: "0",
        except_time_split_from_day: false
    })
    //-----------------Form load
    useEffect(() => {
        loadEditForm();
    }, []);
    async function loadEditForm() {
        const authStore = Store.loginReducer.result;
        if (!authStore) {
            history.push("/login");
        } else {
            // dispatch(checkJWTTOKENAction(history, Store));
            const values = {
                company_id: parseInt(valuesObj)
            }
            const getData = await GetCompanyByID(dispatch, values, authStore)
            if (getData.error) {
                swal("Warning!", getData.message, "warning");
            } else {
                const result = getData.result;
                setCompanyInfo(result)
                setDateStart(result.company_start_date)
                setDateEnd(result.company_expire_date)
                setPromotion(result.company_promotion)
                setCheckCal(result.calculate_enable)
                setSelectExceptDay(result.except_time_split_from_day.toString())
            }
        }
    }
    //-----------------Date Handing
    function handdingDateStart(date) {
        if (moment(date) > moment(dateEnd)) {
            const newMoment = moment(date).add(1, 'days')
            setDateStart(date)
            setDateEnd(newMoment)
        }
        else
            setDateStart(date)
    }
    function handdingDateEnd(date) {
        if (moment(date) < moment(dateStart)) {
            const newMoment = moment(date).subtract(1, 'days')
            setDateStart(newMoment)
            setDateEnd(date);
        }
        else
            setDateEnd(date)
    }
    //----------------On Create
    function onEditClick() {
        dispatch(EditCompanyAction(history, {
            company_id: companyInfo.company_id.toString(),
            company_code: companyInfo.company_code,
            company_name: companyInfo.company_name,
            price_of_cardloss: companyInfo.price_of_cardloss,
            company_start_date: moment(dateStart).set({ hour: 0, minute: 0, second: 0 }).format("yyyy-MM-DD HH:mm:ss"),
            company_expire_date: moment(dateEnd).set({ hour: 0, minute: 0, second: 0 }).format("yyyy-MM-DD HH:mm:ss"),
            company_promotion: promotion,
            calculate_enable: checkCal,
            except_time_split_from_day: selectExceptDay === "true" ? true : false,
            image,
            remark
        }, Store.loginReducer.result))
        console.log(valuesObj)
        console.log(image)

    }
    function onCloseModal() {
        setShowModal(false);
    }
    //------------Status Avatar
    let statusAvatarElem = null;
    if (companyInfo.status) {
        statusAvatarElem = <GridContainer>
            <GridItem>
                <AvatarForm
                    text={getStatus(companyInfo.status)}
                    status={companyInfo.status}
                />
            </GridItem>
        </GridContainer>

    }
    //------------btn disable
    let btnDisableElem = null;
    if (companyInfo.status.toUpperCase() !== 'DISABLE') {
        btnDisableElem = <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<Icon>remove_circle</Icon>}
        >
            ระงับการใช้งาน
         </Button>
    }
    //-------------
    let formCreateDataElem = null;
    if (companyInfo.create_date) {
        formCreateDataElem =
            <div><GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                    <TextField
                        disabled
                        label="วันที่สร้าง"
                        defaultValue={companyInfo.create_date}
                        variant="filled"
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={6}>
                    <TextField
                        disabled
                        label="ผู้สร้าง"
                        defaultValue={companyInfo.create_by}
                        variant="filled"
                    />
                </GridItem>
            </GridContainer>
                <br></br>
            </div>
    }
    //-------------When updated data
    let formUpdateDataElem = null;
    if (companyInfo.update_date) {
        formUpdateDataElem =
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                        <TextField
                            disabled
                            label="วันที่แก้ไขล่าสุด"
                            defaultValue={companyInfo.update_date}
                            variant="filled"
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                        <TextField
                            disabled
                            label="ผู้แก้ไขล่าสุด"
                            defaultValue={companyInfo.update_by}
                            variant="filled"
                        />
                    </GridItem>
                </GridContainer>
                <br></br>
            </div>
    }
    //-------------When Disable data
    let formDisableDataElem = null;
    if (companyInfo.delete_date) {
        formDisableDataElem =
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={6}>
                        <TextField
                            disabled
                            label="วันที่ยกเลิกบริการล่าสุด"
                            defaultValue={companyInfo.delete_date}
                            variant="filled"
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                        <TextField
                            disabled
                            label="ผู้ยกเลิกบริการล่าสุด"
                            defaultValue={companyInfo.delete_by}
                            variant="filled"
                        />
                    </GridItem>
                </GridContainer>
                <br></br>
            </div>
    }
    //-------------------------------------
    return (
        <Dialog
            open={showModal}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle className={classes.headModalEdit} id="scroll-dialog-title">แก้ไขข้อมูลโครงการ</DialogTitle>
            <DialogContent dividers={scroll === 'paper'} className={classes.paper}>
                <div>
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={10}>
                            {statusAvatarElem}
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="รหัสโครงการ"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "15",
                                            value: companyInfo.company_code,
                                            onChange: event => setCompanyInfo({ ...companyInfo, company_code: event.target.value })
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="ชื่อโครงการ"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "255",
                                            value: companyInfo.company_name,
                                            onChange: event => setCompanyInfo({ ...companyInfo, company_name: event.target.value })
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <InputFile
                                        title="เลือกรูปภาพหลักฐานที่ขอแก้ไขข้อมูล"
                                        setValue={setImage}
                                    />
                                </GridItem>
                            </GridContainer>
                            <br></br>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <DateMaterialUi
                                        title="วันที่เริ่มเปิดให้บริการ"
                                        selectedDate={dateStart}
                                        setSelectedDate={handdingDateStart}
                                    />
                                </GridItem>
                                <br></br>
                                <GridItem xs={12} sm={6} md={6}>
                                    <DateMaterialUi
                                        title="วันทีหยุดให้บริการ"
                                        selectedDate={dateEnd}
                                        setSelectedDate={handdingDateEnd}
                                    />
                                </GridItem>
                            </GridContainer>
                            <br></br>
                            {formCreateDataElem}
                            {formUpdateDataElem}
                            {formDisableDataElem}
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <SelectBox
                                        title="เลือก Pro"
                                        setValue={setPromotion}
                                        value={promotion}
                                        items={itemSelectBoxs}
                                    />
                                </GridItem>
                            </GridContainer>
                            <br></br>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Card>
                                        <CardHeader color="warning" stats icon>
                                            <CardIcon color="warning">
                                                <Icon>request_page</Icon>
                                            </CardIcon>
                                            <p >Calculate Setup</p>
                                        </CardHeader>
                                        <CardBody>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <CheckBox
                                                        check={checkCal}
                                                        setCheck={setCheckCal}
                                                        title="เปิดระบบคิดเงิน"
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <RadioBox
                                                        title="เลือกการคำนวนเวลาจอดฟรี"
                                                        value={selectExceptDay}
                                                        setCheck={setSelectExceptDay}
                                                        items={itemRadioBoxs}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={3}>
                                                    <CustomInput
                                                        labelText="ค่าปรับบัตรหาย"
                                                        id="setup-cardlost"
                                                        formControlProps={{
                                                            fullWidth: false,
                                                        }}
                                                        inputProps={{
                                                            maxLength: "5",
                                                            value: companyInfo.price_of_cardloss,
                                                            onChange: event => setCompanyInfo({ ...companyInfo, price_of_cardloss: event.target.value })
                                                        }}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="กรอกเหตุผลที่แก้ไขข้อมูล"
                                        id="comp-name-th"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "255",
                                            value: remark,
                                            onChange: event => setRemark(event.target.value)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                    </GridContainer>
                </div>
            </DialogContent>
            <DialogActions>
                {btnDisableElem}
                <Button onClick={onEditClick}
                    color="primary"
                    className={classes.btnSave}
                    endIcon={<Icon>save</Icon>}
                >
                    แก้ไข
                </Button>
                <Button onClick={onCloseModal}
                    color="primary"
                    className={classes.btnCancel}
                >
                    ยกเลิก
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CompanyEditModal;