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

import CustomInput from "components/CustomInput/CustomInput.js";
import { ValidateEmail, allnumeric, isNotEngCharOrNumber } from "utils/formatCharacter.util"
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
        remark: "",
        mobile: "",
        line: "",
        email: ""
    })
    const [messageErr, setMessageErr] = useState({
        email: ""
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
        } else if (!Store.companySelectedReducer.result){
            history.push("/admin/user-main");
        }else {
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
        }).filter(fil=>fil.id != Store.companySelectedReducer.result.company_id))
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
                                                    setMessageErr({ ...messageErr, first_name: "กรุณากรอกชื่อ" })
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
                                                    setMessageErr({ ...messageErr, last_name: "กรุณากรอกนามสกุล" })
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
                                                    setMessageErr({ ...messageErr, mobile: "เบอร์โทรต้องเป็นตัวเลขเท่านั้น" })
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
                                                    setMessageErr({ ...messageErr, email: "รูปแบบอีเมลไม่ถูกต้อง" })
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
                                            onChange: event => setUserInfo({ ...userInfo, line: event.target.value })
                                        }}
                                    />
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
                                            value: userInfo.remark,
                                            multiline: true,
                                            rows: 4,
                                            onChange: event => setUserInfo({ ...userInfo, remark: event.target.value })
                                        }}
                                    />
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
                                                                    setMessageErr({ ...messageErr, username: "กรุณากรอก Username" })
                                                                } else if (isNotEngCharOrNumber(pass)) {
                                                                    setMessageErr({ ...messageErr, username: "Username ต้องเป็นอักษรภาษาอังกฤษ หรือตัวเลขเท่านั้น" })
                                                                } else {
                                                                    setMessageErr({ ...messageErr, username: "" })
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ color: "red" }}>{messageErr.username}</span>
                                                </GridItem>
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
                                                                    setMessageErr({ ...messageErr, password: "กรุณากรอก Password" })
                                                                } else if (isNotEngCharOrNumber(pass)) {
                                                                    setMessageErr({ ...messageErr, password: "Password ต้องเป็นอักษรภาษาอังกฤษ หรือตัวเลขเท่านั้น" })
                                                                } else {
                                                                    setMessageErr({ ...messageErr, password: "" })
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ color: "red" }}>{messageErr.password}</span>
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
                                                </GridItem>
                                                <span style={{ color: "red" }}>{messageErr.privilege}</span>
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