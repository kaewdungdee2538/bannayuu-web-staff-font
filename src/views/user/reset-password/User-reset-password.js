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
import { ResetPasswordUserAction } from "actions/user/user-reset-password.action"
import CustomInput from "components/CustomInput/CustomInput.js";
import SelectBox from "components/Select/SelectBox"
import swal from 'sweetalert';
import { IsProhibitSpecial, IsHomeProbitSpecial } from "utils/formatCharacter.util"
import {itemSelectBoxsHoldTime} from "views/user/data/User.data"
import {
    MESSAGE_HOLDTIME_NOT_FOUND,
    MESSAGE_COMPANY_ID_NOTFOUND,
    MESSAGE_REMARK_SPECIAL,
    MESSAGE_REMARK_NOT_FOUND,
    MESSAGE_EMPLOYEE_ID_NOTFOUND,
} from "constants/message.constant"
const useStyles = makeStyles(styles);

function UserResetPassword() {
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
        hold_time: "",
        remark: ""
    })
    const [remark, setRemark] = useState("")
    const [holdTime, setHoldTime] = useState("")
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
            history.push("/user-reset-password-listcompany-select");
        } else if (!userStore) {
            history.push("/user-reset-password-list");
        } else {
            dispatch(checkJWTTOKENAction(history, Store));
            const valuesObj = {
                company_id: companyStore.company_id,
                employee_id: userStore.employee_id
            }
            const getData = await GetUserByID(dispatch, valuesObj, authStore)
            if (getData.error) {
                swal("Warning!", getData.message, "warning").then(() => {
                    history.push("/user-reset-password-list");
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
    function onResetPasswordClick() {
        const company_id = parseInt(Store.companySelectedReducer.result.company_id)
        const employee_id = parseInt(Store.userSelectReducer.result.employee_id)
        const valuesObj = {
            employee_id: employee_id.toString(),
            remark,
            hold_time: holdTime,
            company_id: company_id.toString(),
        }
        if (resetPasswordUserMiddleware(valuesObj)) {
            dispatch(ResetPasswordUserAction(history, valuesObj, Store.loginReducer.result));
        }
    }
   
    //-----------------------Middleware for Create 
    function resetPasswordUserMiddleware(valuesObj) {
        resetTextError();
        if (!valuesObj.company_id) {
            swal("Warning!", MESSAGE_COMPANY_ID_NOTFOUND, "warning");
            return false;
        } else if (!valuesObj.employee_id) {
            swal("Warning!", MESSAGE_EMPLOYEE_ID_NOTFOUND, "warning");
        } else if (!valuesObj.remark) {
            swal("Warning!", MESSAGE_REMARK_NOT_FOUND, "warning");
            setMessageErr({ ...messageErr, remark: MESSAGE_REMARK_NOT_FOUND })
            return false;
        } else if (IsProhibitSpecial(valuesObj.remark)) {
            swal("Warning!", MESSAGE_REMARK_SPECIAL, "warning");
            setMessageErr({ ...messageErr, remark: MESSAGE_REMARK_SPECIAL })
            return false;
        } else if(!valuesObj.hold_time){
            swal("Warning!", MESSAGE_HOLDTIME_NOT_FOUND, "warning");
            setMessageErr({ ...messageErr, hold_time: MESSAGE_HOLDTIME_NOT_FOUND })
        }
        // else if (!valuesObj.last_name) {
        //     swal("Warning!", MESSAGE_LAST_NAME_NOTFOUND, "warning");
        //     setMessageErr({ ...messageErr, last_name: MESSAGE_LAST_NAME_NOTFOUND })
        //     return false;
        // } else if (IsProhibitSpecial(valuesObj.last_name)) {
        //     swal("Warning!", MESSAGE_LAST_NAME_PROHIBIT_SPECIAL, "warning");
        //     setMessageErr({ ...messageErr, last_name: MESSAGE_LAST_NAME_PROHIBIT_SPECIAL })
        //     return false;
        // } 

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
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Label
                                        title="Username"
                                        value={userInfo.username}
                                    />
                                </GridItem>
                            </GridContainer>
                            <br></br>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Label
                                        title="ชื่อ"
                                        value={userInfo.first_name}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Label
                                        title="นามสกุล"
                                        value={userInfo.last_name}
                                    />
                                </GridItem>
                            </GridContainer>
                            <br></br>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <SelectBox
                                        title="เลือกเวลาในการ Reset password"
                                        setValue={setHoldTime}
                                        value={holdTime}
                                        items={itemSelectBoxsHoldTime}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.hold_time}</span>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="เหตุผลที่ Reset password"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            maxLength: "255",
                                            value: remark,
                                            multiline: true,
                                            rows: 4,
                                            onChange: event => setRemark(event.target.value),
                                            onBlur: event => {
                                                if (!event.target.value) {
                                                    setMessageErr({ ...messageErr, remark: MESSAGE_REMARK_NOT_FOUND })
                                                }
                                                else if (IsHomeProbitSpecial(event.target.value)) {
                                                    setMessageErr({ ...messageErr, remark: MESSAGE_REMARK_SPECIAL })
                                                } else {
                                                    setMessageErr({ ...messageErr, remark: "" })
                                                }
                                            }
                                        }}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.remark}</span>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button
                                color="primary"
                                className={classes.btnSave}
                                onClick={onResetPasswordClick}
                                endIcon={<Icon style={{ fontSize: "25px" }}>lock_reset</Icon>}
                            >Reset Password</Button>
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
    ResetPasswordUserAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(UserResetPassword);