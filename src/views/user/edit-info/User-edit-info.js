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
import Label from "components/Label/Label"
import { checkJWTTOKENAction } from "actions/main/main.action"
import { GetPrivilegeAllAction } from "actions/privilege/privilege-all.action"
import { GetUserByID } from "actions/user/user-get-info.action"
import { EditUserAction } from "actions/user/user-edit-info.action"
import CustomInput from "components/CustomInput/CustomInput.js";
import swal from 'sweetalert';
import { ValidateEmail, ValidateLine, allnumeric, IsProhibitSpecial, IsHomeProbitSpecial } from "utils/formatCharacter.util"
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
    MESSAGE_COMPANY_ID_NOTFOUND,
} from "constants/message.constant"
const useStyles = makeStyles(styles);

function UserEditInfo() {
    const history = useHistory();
    const classes = useStyles();
    const Store = useSelector(state => state)
    const dispatch = useDispatch();
    //-----------------state
    const [userInfo, setUserInfo] = useState({
        username: "",
        first_name: "",
        last_name: "",
        address: "",
        mobile: "",
        line: "",
        email: "",
    })
    const [messageErr, setMessageErr] = useState({
        first_name: "",
        last_name: "",
        address: "",
        mobile: "",
        line: "",
        email: ""
    })
    //-----------------Form load
    useEffect(() => {
        loadMainForm();
    }, []);
    async function loadMainForm() {
        const authStore = Store.loginReducer.result;
        const companyStore = Store.companySelectedReducer.result;
        const userStore = Store.userSelectReducer.result;
        if (!authStore) {
            history.push("/login");
        } else if (!companyStore) {
            history.push("/user-edit-info-select");
        } else if (!userStore) {
            history.push("/user-edit-list");
        } else {
            dispatch(checkJWTTOKENAction(history, Store));
            const valuesObj = {
                company_id: companyStore.company_id,
                employee_id: userStore.employee_id
            }
            const getData = await GetUserByID(dispatch, valuesObj, authStore)
            if (getData.error) {
                swal("Warning!", getData.message, "warning").then(()=>{
                    history.push("/user-edit-list");
                })
            } else {
                const result = getData.result;
                setUserInfo({
                    username: result.username,
                    first_name: result.first_name_th,
                    last_name: result.last_name_th,
                    address: result.address,
                    mobile: result.employee_mobile,
                    line: result.employee_line,
                    email: result.employee_email,
                })
            }
        }
    }

    //-----------------------On Create Click
    function onEditInfoClick() {
        const company_id = parseInt(Store.companySelectedReducer.result.company_id)
        const employee_id = parseInt(Store.userSelectReducer.result.employee_id)
        const valuesObj = {
            employee_id: employee_id.toString(),
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            address: userInfo.address,
            mobile: userInfo.mobile,
            line: userInfo.line,
            email: userInfo.email,
            company_id: company_id.toString(),
        }
        if (editInfoUserMiddleware(valuesObj)) {
            dispatch(EditUserAction(history, valuesObj, Store.loginReducer.result));
        }
    }
    //-----------------------Middleware for Create 
    function editInfoUserMiddleware(valuesObj) {
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
            email: ""
        })
    }
    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #007bff, #1e88e5)" }} color="primary">
                            <h4 className={classes.cardTitleWhite}>แก้ไขข้อมูลผู้ใช้งาน</h4>
                            <p className={classes.cardCategoryWhite}>Edit user information</p>
                        </CardHeader>
                        <CardBody>
                            <Label
                                title="Username"
                                value={userInfo.username}
                            />
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
                        </CardBody>
                        <CardFooter>
                            <Button
                                color="primary"
                                className={classes.btnSave}
                                onClick={onEditInfoClick}
                                endIcon={<Icon style={{ fontSize: "25px" }}>save</Icon>}
                            >แก้ไขข้อมูลผู้ใช้งาน</Button>
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
    GetPrivilegeAllAction,
    GetUserByID,
    EditUserAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(UserEditInfo);