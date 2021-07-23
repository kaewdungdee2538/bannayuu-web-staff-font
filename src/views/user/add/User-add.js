import { styles } from "views/styles/card.style"
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter"
import Icon from '@material-ui/core/Icon';
import CardIcon from "components/Card/CardIcon.js";
import SelectBox from "components/Select/SelectBox"
import TransferList from "components/TransferList/TransferList"
import { checkJWTTOKENAction } from "actions/main/main.action"
import { GetPrivilegeAllAction } from "actions/privilege/privilege-all.action"
import { GetCompanyListAllAction } from "actions/company/company-list.action"
import { CreateUserAction } from "actions/user/user-add.action"
import CustomInput from "components/CustomInput/CustomInput.js";
import swal from 'sweetalert';
import { ValidateEmail, ValidateLine, allnumeric, isNotEngCharOrNumber, IsProhibitSpecial, IsHomeProbitSpecial } from "utils/formatCharacter.util"
import {
    MESSAGE_FIRST_NAME_NOTFOUND,
    MESSAGE_FIRST_NAME_PROHIBIT_SPECIAL,
    MESSAGE_LAST_NAME_NOTFOUND,
    MESSAGE_LAST_NAME_PROHIBIT_SPECIAL,
    MESSAGE_ADDRESS_PROHITBIT_SPECIAL,
    MESSAGE_MOBILE_NOT_NUMBER,
    MESSAGE_MOBILE_NOT_10_CHARACTER,
    MESSAGE_LINE_FORMAT_INVALID,
    MESSAGE_EMAIL_FORMAT_INVALID,
    MESSAGE_NOT_SELECT_PRIVILEGE,
    MESSAGE_USER_NOT_FOUND,
    MESSAGE_USER_NOT_END_OR_NUMBER,
    MESSAGE_PASSWORD_NOT_FOUND,
    MESSAGE_PASSWORD_NOT_END_OR_NUMBER,
    MESSAGE_COMPANY_ID_NOTFOUND,
    MESSAGE_PASSWORD_NOT_EQUAL
} from "constants/message.constant"
// import { buttonStyle } from "utils/btnStyle.utils"
const useStyles = makeStyles(styles);

function UserAdd() {
    const history = useHistory();
    const classes = useStyles();
    // const classesBtn = buttonStyle();
    const Store = useSelector(state => state)
    const dispatch = useDispatch();
    //-----------------state
    const [userInfo, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        address: "",
        mobile: "",
        line: "",
        email: "",
        username: "",
        password: "",
        password_confirm: ""
    })
    const [messageErr, setMessageErr] = useState({
        first_name: "",
        last_name: "",
        address: "",
        mobile: "",
        line: "",
        email: "",
        username: "",
        password: "",
        password_confirm: "",
        privilege: ""
    })
    const [selectPrivilege, setSelectPrivilege] = useState("");
    const [companyListItemRight, setCompanyListItemRight] = useState([]);
    const [companyListItemLeft, setCompanyListItemLeft] = useState([]);
    //-----------------Form load
    useEffect(() => {
        loadMainForm();
    }, []);
    function loadMainForm() {
        const authStore = Store.loginReducer.result;
        if (!authStore) {
            history.push("/login");
        } else if (!Store.companySelectedReducer.result) {
            history.push("/user-main");
        } else {
            dispatch(checkJWTTOKENAction(history, Store));
            dispatch(GetPrivilegeAllAction(history, authStore))
            dispatch(GetCompanyListAllAction(history, authStore))
        }
    }
    const privilegeItems = Store.privilegeGetAllReducer.result.map(item => {
        return {
            key: item.employee_privilege_type,
            value: item.employee_privilege_id,
            text: item.employee_privilege_name_th
        }
    })
    if (Store.companyListGetAllReducer.result.length > 0 && companyListItemLeft.length === 0 && companyListItemRight.length === 0)
        setCompanyListItemLeft(Store.companyListGetAllReducer.result.map(item => {
            return { value: item.company_name, id: item.company_id }
        }).filter(fil => fil.id != Store.companySelectedReducer.result.company_id))

    //-----------------------On Create Click
    function onCreateClick() {
        const company_id = parseInt(Store.companySelectedReducer.result.company_id)
        const employee_type = Store.privilegeGetAllReducer.result.filter(item => { return item.employee_privilege_id == selectPrivilege }).map(item => {
            return item.employee_privilege_type
        })
        const company_list = companyListItemRight.map(item => item.id)
        const valuesObj = {
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            address: userInfo.address,
            mobile: userInfo.mobile,
            line: userInfo.line,
            email: userInfo.email,
            username: userInfo.username,
            password: userInfo.password,
            password_confirm: userInfo.password_confirm,
            employee_privilege_id: selectPrivilege.toString(),
            status: "INIT",
            employee_type: employee_type[0],
            company_id: company_id.toString(),
            company_list: [company_id, ...company_list]
        }
        if (createUserMiddleware(valuesObj)) {
            dispatch(CreateUserAction(history, valuesObj, Store.loginReducer.result));
        }
    }
    //-----------------------Middleware for Create 
    function createUserMiddleware(valuesObj) {
        resetTextError();
        if (!valuesObj.company_id) {
            swal("Warning!", MESSAGE_COMPANY_ID_NOTFOUND, "warning");
            return false;
        } else if (!valuesObj.first_name) {
            swal("Warning!", MESSAGE_FIRST_NAME_NOTFOUND, "warning");
            setMessageErr({ ...messageErr, first_name: MESSAGE_FIRST_NAME_NOTFOUND })
            return false;
        } else if (IsProhibitSpecial(valuesObj.first_name)) {
            swal("Warning!", MESSAGE_FIRST_NAME_PROHIBIT_SPECIAL, "warning");
            setMessageErr({ ...messageErr, first_name: MESSAGE_FIRST_NAME_PROHIBIT_SPECIAL })
            return false;
        } else if (!valuesObj.last_name) {
            swal("Warning!", MESSAGE_LAST_NAME_NOTFOUND, "warning");
            setMessageErr({ ...messageErr, last_name: MESSAGE_LAST_NAME_NOTFOUND })
            return false;
        } else if (IsProhibitSpecial(valuesObj.last_name)) {
            swal("Warning!", MESSAGE_LAST_NAME_PROHIBIT_SPECIAL, "warning");
            setMessageErr({ ...messageErr, last_name: MESSAGE_LAST_NAME_PROHIBIT_SPECIAL })
            return false;
        } else if (!valuesObj.username) {
            swal("Warning!", MESSAGE_USER_NOT_FOUND, "warning");
            setMessageErr({ ...messageErr, username: MESSAGE_USER_NOT_FOUND })
            return false;
        } else if (isNotEngCharOrNumber(valuesObj.username)) {
            swal("Warning!", MESSAGE_USER_NOT_END_OR_NUMBER, "warning");
            setMessageErr({ ...messageErr, username: MESSAGE_USER_NOT_END_OR_NUMBER })
            return false;
        } else if (!valuesObj.password) {
            swal("Warning!", MESSAGE_PASSWORD_NOT_FOUND, "warning");
            setMessageErr({ ...messageErr, password: MESSAGE_PASSWORD_NOT_FOUND })
            return false;
        } else if (isNotEngCharOrNumber(valuesObj.password)) {
            swal("Warning!", MESSAGE_PASSWORD_NOT_END_OR_NUMBER, "warning");
            setMessageErr({ ...messageErr, password: MESSAGE_PASSWORD_NOT_END_OR_NUMBER })
            return false;
        } else if (valuesObj.password != valuesObj.password_confirm) {
            swal("Warning!", MESSAGE_PASSWORD_NOT_EQUAL, "warning");
            setMessageErr({ ...messageErr, password: MESSAGE_PASSWORD_NOT_EQUAL, password_confirm: MESSAGE_PASSWORD_NOT_EQUAL })
            return false;
        } else if (!valuesObj.employee_privilege_id) {
            swal("Warning!", MESSAGE_NOT_SELECT_PRIVILEGE, "warning");
            setMessageErr({ ...messageErr, privilege: MESSAGE_NOT_SELECT_PRIVILEGE })
            return false;
        } else if (IsHomeProbitSpecial(valuesObj.address)) {
            swal("Warning!", MESSAGE_ADDRESS_PROHITBIT_SPECIAL, "warning");
            setMessageErr({ ...messageErr, address: MESSAGE_ADDRESS_PROHITBIT_SPECIAL })
            return false;
        }
        if (valuesObj.email)
            if (!ValidateEmail(valuesObj.email)) {
                swal("Warning!", MESSAGE_EMAIL_FORMAT_INVALID, "warning");
                setMessageErr({ ...messageErr, email: MESSAGE_EMAIL_FORMAT_INVALID })
                return false;
            }
        if (valuesObj.line)
            if (!ValidateLine(valuesObj.line)) {
                swal("Warning!", MESSAGE_LINE_FORMAT_INVALID, "warning");
                setMessageErr({ ...messageErr, line: MESSAGE_LINE_FORMAT_INVALID })
                return false;
            }
        if (valuesObj.moblie) {
            if (!allnumeric(valuesObj.moblie)) {
                swal("Warning!", MESSAGE_MOBILE_NOT_NUMBER, "warning");
                setMessageErr({ ...messageErr, mobile: MESSAGE_MOBILE_NOT_NUMBER })
                return false;
            } else if (valuesObj.moblie.length != 10) {
                swal("Warning!", MESSAGE_MOBILE_NOT_10_CHARACTER, "warning");
                setMessageErr({ ...messageErr, mobile: MESSAGE_MOBILE_NOT_10_CHARACTER })
                return false;
            }
        }
        return true;
    }
    function resetTextError() {
        setMessageErr({
            first_name: "",
            last_name: "",
            address: "",
            mobile: "",
            line: "",
            email: "",
            username: "",
            password: "",
            password_confirm: "",
            privilege: ""
        })
    }
    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #007bff, #1e88e5)" }} color="primary">
                            <h4 className={classes.cardTitleWhite}>สร้างผู้ใช้งานใหม่</h4>
                            <p className={classes.cardCategoryWhite}>Create New User</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <CustomInput
                                        labelText="ชื่อ"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "250",
                                            value: userInfo.first_name,
                                            onChange: event => setUserInfo({ ...userInfo, first_name: event.target.value }),
                                            onBlur: event => {
                                                if (!event.target.value) {
                                                    setMessageErr({ ...messageErr, first_name: MESSAGE_FIRST_NAME_NOTFOUND })
                                                } else if (IsProhibitSpecial(event.target.value)) {
                                                    setMessageErr({ ...messageErr, first_name: MESSAGE_FIRST_NAME_PROHIBIT_SPECIAL })
                                                } else {
                                                    setMessageErr({ ...messageErr, first_name: "" })
                                                }
                                            }
                                        }}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.first_name}</span>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <CustomInput
                                        labelText="นามสกุล"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "250",
                                            value: userInfo.last_name,
                                            onChange: event => setUserInfo({ ...userInfo, last_name: event.target.value }),
                                            onBlur: event => {
                                                if (!event.target.value) {
                                                    setMessageErr({ ...messageErr, last_name: MESSAGE_LAST_NAME_NOTFOUND })
                                                } else if (IsProhibitSpecial(event.target.value)) {
                                                    setMessageErr({ ...messageErr, last_name: MESSAGE_LAST_NAME_PROHIBIT_SPECIAL })
                                                } else {
                                                    setMessageErr({ ...messageErr, last_name: "" })
                                                }
                                            }
                                        }}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.last_name}</span>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <CustomInput
                                        labelText="เบอร์โทรศัพท์"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "10",
                                            value: userInfo.mobile,
                                            onChange: event => setUserInfo({ ...userInfo, mobile: event.target.value }),
                                            onBlur: event => {
                                                if (!allnumeric(event.target.value)) {
                                                    setMessageErr({ ...messageErr, mobile: MESSAGE_MOBILE_NOT_NUMBER })
                                                } else if (event.target.value.length != 10) {
                                                    setMessageErr({ ...messageErr, mobile: MESSAGE_MOBILE_NOT_10_CHARACTER })
                                                } else {
                                                    setMessageErr({ ...messageErr, mobile: "" })
                                                }
                                            }
                                        }}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.mobile}</span>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <CustomInput
                                        labelText="อีเมล"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "100",
                                            value: userInfo.email,
                                            onChange: event => setUserInfo({ ...userInfo, email: event.target.value }),
                                            onBlur: event => {
                                                if (!ValidateEmail(event.target.value)) {
                                                    setMessageErr({ ...messageErr, email: MESSAGE_EMAIL_FORMAT_INVALID })
                                                } else {
                                                    setMessageErr({ ...messageErr, email: "" })
                                                }
                                            }
                                        }}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.email}</span>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <CustomInput
                                        labelText="ไลน์"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "50",
                                            value: userInfo.line,
                                            onChange: event => setUserInfo({ ...userInfo, line: event.target.value }),
                                            onBlur: event => {
                                                if (!ValidateLine(event.target.value)) {
                                                    setMessageErr({ ...messageErr, line: MESSAGE_LINE_FORMAT_INVALID })
                                                } else {
                                                    setMessageErr({ ...messageErr, line: "" })
                                                }
                                            }
                                        }}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.line}</span>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="ที่อยู่"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "255",
                                            value: userInfo.address,
                                            multiline: true,
                                            rows: 4,
                                            onChange: event => setUserInfo({ ...userInfo, address: event.target.value }),
                                            onBlur: event => {
                                                if (IsHomeProbitSpecial(event.target.value)) {
                                                    setMessageErr({ ...messageErr, address: MESSAGE_ADDRESS_PROHITBIT_SPECIAL })
                                                } else {
                                                    setMessageErr({ ...messageErr, address: "" })
                                                }
                                            }
                                        }}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.address}</span>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Card>
                                        <CardHeader color="warning" stats icon>
                                            <CardIcon color="success">
                                                <Icon>supervised_user_circle</Icon>
                                            </CardIcon>
                                            <p className={classes.cardCategory}>User Setting</p>
                                        </CardHeader>
                                        <CardBody>
                                            <GridContainer>
                                                <GridItem xs={12} sm={6} md={6}>
                                                    <CustomInput
                                                        labelText="Username"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                        inputProps={{
                                                            maxLength: "100",
                                                            value: userInfo.username,
                                                            onChange: event => setUserInfo({ ...userInfo, username: event.target.value }),
                                                            onBlur: event => {
                                                                const pass = event.target.value
                                                                if (!pass) {
                                                                    setMessageErr({ ...messageErr, username: MESSAGE_USER_NOT_FOUND })
                                                                } else if (isNotEngCharOrNumber(pass)) {
                                                                    setMessageErr({ ...messageErr, username: MESSAGE_USER_NOT_END_OR_NUMBER })
                                                                } else {
                                                                    setMessageErr({ ...messageErr, username: "" })
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ color: "red" }}>{messageErr.username}</span>
                                                </GridItem>

                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={6} md={6}>
                                                    <CustomInput
                                                        labelText="Password"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                        inputProps={{
                                                            maxLength: "50",
                                                            type: "password",
                                                            value: userInfo.password,
                                                            onChange: event => setUserInfo({ ...userInfo, password: event.target.value }),
                                                            onBlur: event => {
                                                                const pass = event.target.value
                                                                if (!pass) {
                                                                    setMessageErr({ ...messageErr, password: MESSAGE_PASSWORD_NOT_FOUND })
                                                                } else if (isNotEngCharOrNumber(pass)) {
                                                                    setMessageErr({ ...messageErr, password: MESSAGE_PASSWORD_NOT_END_OR_NUMBER })
                                                                } else {
                                                                    setMessageErr({ ...messageErr, password: "" })
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ color: "red" }}>{messageErr.password}</span>
                                                </GridItem>
                                                <GridItem xs={12} sm={6} md={6}>
                                                    <CustomInput
                                                        labelText="Comfirm-Password"
                                                        formControlProps={{
                                                            fullWidth: true,
                                                        }}
                                                        inputProps={{
                                                            maxLength: "50",
                                                            type: "password",
                                                            value: userInfo.password_confirm,
                                                            onChange: event => setUserInfo({ ...userInfo, password_confirm: event.target.value }),
                                                            onBlur: event => {
                                                                const pass = event.target.value
                                                                if (pass != userInfo.password) {
                                                                    setMessageErr({ ...messageErr, password_confirm: MESSAGE_PASSWORD_NOT_EQUAL })
                                                                } else {
                                                                    setMessageErr({ ...messageErr, password_confirm: "" })
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ color: "red" }}>{messageErr.password_confirm}</span>
                                                </GridItem>
                                            </GridContainer>
                                            <GridContainer>
                                                <GridItem xs={12} sm={6} md={6}>
                                                    <SelectBox
                                                        title="เลือกสิทธิ์การเข้าใช้งาน"
                                                        value={selectPrivilege}
                                                        setValue={setSelectPrivilege}
                                                        items={privilegeItems}
                                                    />
                                                    <span style={{ color: "red" }}>{messageErr.privilege}</span>
                                                </GridItem>
                                            </GridContainer>
                                            <br></br>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <h4 style={{ textAlign: "center" }}>เลือกโครงการที่ดูแลเพิ่มเติม</h4>
                                                </GridItem>
                                                <br></br>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <TransferList
                                                        titleLeft="โครงการที่ยังไม่เลือก"
                                                        titleRight="โครงการที่ถูกเลือก"
                                                        leftItems={companyListItemLeft}
                                                        setLeftItems={setCompanyListItemLeft}
                                                        rightItems={companyListItemRight}
                                                        setRightItems={setCompanyListItemRight}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="success"
                                onClick={onCreateClick}
                                endIcon={<Icon style={{ fontSize: "25px" }}>person_add</Icon>}
                            >สร้างผู้ใช้งาน</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}


const mapStateToProps = ({ mainReducer, privilegeGetAllReducer, companyListGetAllReducer }) => ({ mainReducer, privilegeGetAllReducer, companyListGetAllReducer })

const mapDispatchToProps = {
    checkJWTTOKENAction,
    GetPrivilegeAllAction
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);