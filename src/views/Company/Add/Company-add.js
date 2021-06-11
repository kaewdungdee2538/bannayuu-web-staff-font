import { styles } from "./Company-style"
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import DateMaterialUi from "components/DateTime/DateMaterialUi"
import SelectBox from "components/Select/SelectBox"
import moment from "moment";
import { itemSelectBoxs, itemRadioBoxs } from "../data/Company-data"
import CardIcon from "components/Card/CardIcon.js";
import Icon from "@material-ui/core/Icon";
import CheckBox from "components/CheckBox/CheckBox"
import RadioBox from "components/RadioBox/RadioBox"
import InputFile from "components/Input/InputFile"
import { CreateCompanyAction } from "actions/company/company-add.action"
import { checkJWTTOKENAction } from "actions/main/main.action"
const useStyles = makeStyles(styles);

function CompanyAdd() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const Store = useSelector(state => state)
    //----------Set default value
    const dStart = moment();
    const dEnd = moment().add(30, 'days');
    //----------State
    const [dateStart, setDateStart] = useState(dStart);
    const [dateEnd, setDateEnd] = useState(dEnd);
    const [promotion, setPromotion] = useState("");
    const [checkCal, setCheckCal] = useState(false);
    const [checkSecureEstampVisitor, setCheckSecureEstampVisitor] = useState(false);
    const [checkSecureEstampBooking, setCheckSecureEstampBooking] = useState(false);
    const [selectExceptDay, setSelectExceptDay] = useState("true");
    const [image, setImage] = useState(null);
    const [companyInfo, setCompanyInfo] = useState({
        company_code: "",
        company_name: "",
        price_of_cardloss: ""
    })
    //-----------------Form load
    useEffect(() => {
        loadMainForm();
    }, []);
    function loadMainForm() {
        const authStore = Store.loginReducer.result;
        if (!authStore) {
            history.push("/login");
        } else {
            dispatch(checkJWTTOKENAction(history, Store));
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
    function onCreateClick() {
        dispatch(CreateCompanyAction(history, {
            company_code: companyInfo.company_code,
            company_name: companyInfo.company_name,
            price_of_cardloss: companyInfo.price_of_cardloss.toString(),
            company_start_date: moment(dateStart).set({ hour: 0, minute: 0, second: 0 }).format("yyyy-MM-DD HH:mm:ss"),
            company_expire_date: moment(dateEnd).set({ hour: 0, minute: 0, second: 0 }).format("yyyy-MM-DD HH:mm:ss"),
            company_promotion: promotion,
            calculate_enable: checkCal,
            except_time_split_from_day: selectExceptDay === "true" ? true : false,
            booking_estamp_verify: checkSecureEstampVisitor,
            visitor_estamp_verify: checkSecureEstampBooking,
            image
        }, Store.loginReducer.result))
    }
    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>สร้างโครงการใหม่</h4>
                            <p className={classes.cardCategoryWhite}>Create new company</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="รหัสโครงการ"
                                        id="comp-code"
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
                                        id="comp-name-th"
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
                                        title="เลือกรูปภาพใบ PO"
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
                                            <p className={classes.cardCategory}>Calculate Setup</p>
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
                            <br></br>
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
                        </CardBody>
                        <CardFooter>
                            <Button color="success"
                                onClick={onCreateClick}
                            >สร้างโครงการใหม่</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}


const mapStateToProps = ({ mainReducer }) => ({ mainReducer })

const mapDispatchToProps = {
    CreateCompanyAction
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyAdd);