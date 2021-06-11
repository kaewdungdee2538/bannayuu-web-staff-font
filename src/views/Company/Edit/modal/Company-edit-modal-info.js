
import { itemSelectBoxs, itemRadioBoxs, getStatus } from "../data/Company-edit-data"
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
import Icon from '@material-ui/core/Icon';
import DialogContent from '@material-ui/core/DialogContent';
import { modalStyle } from 'utils/modalStyle.utils'
import moment from "moment";
function CompanyEditModalInfo(props) {
    const {
        companyInfo,
        setCompanyInfo,
        checkCal,
        setCheckCal,
        checkSecureEstampVisitor,
        setCheckSecureEstampVisitor,
        checkSecureEstampBooking,
        setCheckSecureEstampBooking,
        promotion,
        setPromotion,
        setImage,
        setRemark,
        setSelectExceptDay,
        setDateStart,
        setDateEnd,
        dateStart,
        dateEnd,
        remark,
        selectExceptDay,
    } = props;
    const classes = modalStyle();
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
                            label="วันที่ระงับให้บริการล่าสุด"
                            defaultValue={companyInfo.delete_date}
                            variant="filled"
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                        <TextField
                            disabled
                            label="ผู้ระงับล่าสุด"
                            defaultValue={companyInfo.delete_by}
                            variant="filled"
                        />
                    </GridItem>
                </GridContainer>
                <br></br>
            </div>
    }
    return (
        <DialogContent dividers={scroll === 'paper'} >
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        {statusAvatarElem}
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={5}>
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
                            <GridItem xs={12} sm={12} md={12}>
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
                                            <GridItem xs={12} sm={12} md={5}>
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
                                <Card>
                                    <CardHeader color="info" stats icon>
                                        <CardIcon color="info">
                                            <Icon>admin_panel_settings</Icon>
                                        </CardIcon>
                                        <p className={classes.cardCategory}>Security Setup</p>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CheckBox
                                                    check={checkSecureEstampVisitor}
                                                    setCheck={setCheckSecureEstampVisitor}
                                                    title="เปิดระบบตรวจสอบ E-Stamp ก่อนออกจากโครงการ (Visitor ทั่วไป)"
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <CheckBox
                                                    check={checkSecureEstampBooking}
                                                    setCheck={setCheckSecureEstampBooking}
                                                    title="เปิดระบบตรวจสอบ E-Stamp ก่อนออกจากโครงการ (Booking หรือจากการจอง)"
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <p style={{ color: 'red' }}>***เป็นการตรวจสอบว่าผู้มาเยือนได้ถูกประทับตรา (E-Stamp) จากลูกบ้านที่มาติดต่อ หรือจากฝ่ายนิติบุคคลแล้ว หรือไม่</p>
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
                                        multiline: true,
                                        rows: 4,
                                        onChange: event => setRemark(event.target.value)
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
        </DialogContent>
    )
}

export default CompanyEditModalInfo;