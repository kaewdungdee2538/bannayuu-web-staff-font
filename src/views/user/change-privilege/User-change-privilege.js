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
import Label from "components/Label/Label"
import InputFile from "components/Input/InputFile"
import CustomInput from "components/CustomInput/CustomInput.js";
import { checkJWTTOKENAction } from "actions/main/main.action"
import { GetPrivilegeAllAction } from "actions/privilege/privilege-all.action"
import { GetUserByID } from "actions/user/user-get-info.action"
import {ChangePrivilegeUserAction} from "actions/user/user-change-privilege.action"
import swal from 'sweetalert';
import {
    MESSAGE_NOT_SELECT_PRIVILEGE,
    MESSAGE_COMPANY_ID_NOTFOUND,
    MESSAGE_REMARK_SPECIAL,
    MESSAGE_REMARK_NOT_FOUND,
    MESSAGE_NOTSELECTIMAGE,
    MESSAGE_FILE_IMAGE_INVALID,
} from "constants/message.constant"
import { IsHomeProbitSpecial } from "utils/formatCharacter.util"
import { getExtension, isImage } from "utils/funcImage.utils"

const useStyles = makeStyles(styles);

function UserChangePrivilege() {
    const history = useHistory();
    const classes = useStyles();
    // const classesBtn = buttonStyle();
    const Store = useSelector(state => state)
    const dispatch = useDispatch();
    //-----------------state
    const [userInfo, setUserInfo] = useState({
        username: "",
        privilege: ""
    })
    const [messageErr, setMessageErr] = useState({
        privilege: ""
    })
    const [selectPrivilege, setSelectPrivilege] = useState("");
    const [image, setImage] = useState(null)
    const [remark, setRemark] = useState("");
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
            history.push("/admin/user-change-privilege-select");
        } else if (!userStore) {
            history.push("/admin/user-change-privilege-list");
        } else {
            dispatch(checkJWTTOKENAction(history, Store));
            dispatch(GetPrivilegeAllAction(history, authStore))
            const valuesObj = {
                company_id: companyStore.company_id,
                employee_id: userStore.employee_id
            }
            const getData = await GetUserByID(dispatch, valuesObj, authStore)
            if (getData.error) {
                swal("Warning!", getData.message, "warning");
            } else {
                const result = getData.result;
                setUserInfo({
                    username: result.username,
                    privilege: result.employee_privilege_id,
                })
                setSelectPrivilege(result.employee_privilege_id)
            }
        }
    }
    const privilegeItems = Store.privilegeGetAllReducer.result.map(item => {
        return {
            key: item.employee_privilege_type,
            value: item.employee_privilege_id,
            text: item.employee_privilege_name_th
        }
    })

    //-----------------------On Create Click
    function onChangePrivilegeClick() {
        const company_id = parseInt(Store.companySelectedReducer.result.company_id)
        const employee_id = parseInt(Store.userSelectReducer.result.employee_id)
        const employee_type = Store.privilegeGetAllReducer.result.filter(item => { return item.employee_privilege_id == selectPrivilege }).map(item => {
            return item.employee_privilege_type
        })
        const valuesObj = {
            image,
            employee_privilege_id: selectPrivilege.toString(),
            remark,
            employee_type: employee_type[0],
            company_id: company_id.toString(),
            employee_id: employee_id.toString()
        }
        if (changePrivilegeUserMiddleware(valuesObj)) {
            dispatch(ChangePrivilegeUserAction(history, valuesObj, Store.loginReducer.result));
        }
    }
    //-----------------------Middleware for Create 
    function changePrivilegeUserMiddleware(valuesObj) {
        resetTextError();
        if (!valuesObj.company_id) {
            swal("Warning!", MESSAGE_COMPANY_ID_NOTFOUND, "warning");
            return false;
        } else if (!valuesObj.employee_privilege_id) {
            swal("Warning!", MESSAGE_NOT_SELECT_PRIVILEGE, "warning");
            setMessageErr({ ...messageErr, privilege: MESSAGE_NOT_SELECT_PRIVILEGE })
            return false;
        } else if (!valuesObj.image) {
            swal("Warning!", MESSAGE_NOTSELECTIMAGE, "warning");
            setMessageErr({ ...messageErr, image: MESSAGE_NOTSELECTIMAGE })
            return false;
        } else if (!isImage(getExtension(valuesObj.image.name))) {
            swal("Warning!", MESSAGE_FILE_IMAGE_INVALID, "warning");
            setMessageErr({ ...messageErr, image: MESSAGE_FILE_IMAGE_INVALID })
            return false;
        } else if (!valuesObj.remark) {
            swal("Warning!", MESSAGE_REMARK_NOT_FOUND, "warning");
            setMessageErr({ ...messageErr, remark: MESSAGE_REMARK_NOT_FOUND })
            return false;
        } else if (IsHomeProbitSpecial(valuesObj.remark)) {
            swal("Warning!", MESSAGE_REMARK_SPECIAL, "warning");
            setMessageErr({ ...messageErr, remark: MESSAGE_REMARK_SPECIAL })
            return false;
        }
        return true;
    }
    function resetTextError(){
        setMessageErr({
            privilege: "",
            image: "",
            remark: "",
        })
    }
    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #007bff, #1e88e5)" }} color="primary">
                            <h4 className={classes.cardTitleWhite}>เปลี่ยนสิทธิ์เข้าใช้งานระบบ</h4>
                            <p className={classes.cardCategoryWhite}>Change Privilege</p>
                        </CardHeader>
                        <CardBody>
                            <Label
                                title="Username"
                                value={userInfo.username}
                            />
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
                                                    <SelectBox
                                                        title="เลือกสิทธิ์การเข้าใช้งาน"
                                                        value={selectPrivilege}
                                                        setValue={setSelectPrivilege}
                                                        items={privilegeItems}
                                                    />
                                                    <span style={{ color: "red" }}>{messageErr.privilege}</span>
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputFile
                                        title="เลือกรูปภาพหลักฐานการแจ้งเปลี่ยนสิทธิ์เข้าใช้งานของ User"
                                        setValue={setImage}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.image}</span>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="เหตุผลที่เปลี่ยนสิทธิ์การเข้าใช้งานระบบ"
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
                            <Button color="primary"
                                onClick={onChangePrivilegeClick}
                                endIcon={<Icon style={{ fontSize: "25px" }}>save</Icon>}
                            >บันทึก</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}


const mapStateToProps = ({ mainReducer, privilegeGetAllReducer }) => ({ mainReducer, privilegeGetAllReducer })

const mapDispatchToProps = {
    checkJWTTOKENAction,
    GetPrivilegeAllAction,
    GetUserByID,
    ChangePrivilegeUserAction
}
export default connect(mapStateToProps, mapDispatchToProps)(UserChangePrivilege);