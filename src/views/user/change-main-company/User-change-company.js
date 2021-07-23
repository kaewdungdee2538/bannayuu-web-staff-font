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
import Label from "components/Label/Label"
import InputFile from "components/Input/InputFile"
import CustomInput from "components/CustomInput/CustomInput.js";
import UserChangeCompanyModal from "views/user/change-main-company/User-change-company-modal"
import { checkJWTTOKENAction } from "actions/main/main.action"
import { GetUserByID } from "actions/user/user-get-info.action"
import { ChangeMainCompanyUserAction } from "actions/user/user-change-main-company.action"
import swal from 'sweetalert';
import {
    MESSAGE_COMPANY_ID_NOTFOUND,
    MESSAGE_REMARK_SPECIAL,
    MESSAGE_REMARK_NOT_FOUND,
    MESSAGE_NOTSELECTIMAGE,
    MESSAGE_FILE_IMAGE_INVALID,
    MESSAGE_SELECT_NEW_COMPANY_DUPLICATE_OLD_COMPANY,
    MESSAGE_NOT_SELECT_NEW_COMPANY,
} from "constants/message.constant"
import { IsHomeProbitSpecial } from "utils/formatCharacter.util"
import { getExtension, isImage } from "utils/funcImage.utils"

const useStyles = makeStyles(styles);

function UserChangeCompany() {
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
    const [image, setImage] = useState(null)
    const [remark, setRemark] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectNewCompany, setSelectNewCompany] = useState({ company_id: "", company_code: "", company_name: "" });
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
            history.push("/user-change-company-select");
        } else if (!userStore) {
            history.push("/user-change-company-list");
        } else {
            dispatch(checkJWTTOKENAction(history, Store));
            const valuesObj = {
                company_id: companyStore.company_id,
                employee_id: userStore.employee_id
            }
            const getData = await GetUserByID(dispatch, valuesObj, authStore)
            if (getData.error) {
                swal("Warning!", getData.message, "warning").then(() => {
                    history.push("/user-change-company-list");
                })
            } else {
                const result = getData.result;
                setUserInfo({
                    username: result.username,
                    first_name: result.first_name_th,
                    last_name: result.last_name_th,
                    privilege: result.employee_privilege_id,
                })

            }
        }
    }

    //-----------------------On Create Click
    function onChangeMainCompanyClick() {
        const company_id = parseInt(Store.companySelectedReducer.result.company_id)
        const employee_id = parseInt(Store.userSelectReducer.result.employee_id)

        const valuesObj = {
            image,
            remark,
            old_company_id: company_id.toString(),
            new_company_id: selectNewCompany.company_id.toString(),
            employee_id: employee_id.toString()
        }
        if (changeMainCompanyUserMiddleware(valuesObj)) {
            dispatch(ChangeMainCompanyUserAction(history, valuesObj, Store.loginReducer.result));
        }
    }
    //-----------------------Middleware for Create 
    function changeMainCompanyUserMiddleware(valuesObj) {
        resetTextError();
        if (!valuesObj.old_company_id) {
            swal("Warning!", MESSAGE_COMPANY_ID_NOTFOUND, "warning");
            return false;
        } else if (!valuesObj.new_company_id) {
            swal("Warning!", MESSAGE_NOT_SELECT_NEW_COMPANY, "warning");
            setMessageErr({ ...messageErr, new_company: MESSAGE_NOT_SELECT_NEW_COMPANY })
            return false;
        } else if (valuesObj.old_company_id == valuesObj.new_company_id) {
            swal("Warning!", MESSAGE_SELECT_NEW_COMPANY_DUPLICATE_OLD_COMPANY, "warning");
            setMessageErr({ ...messageErr, new_company: MESSAGE_SELECT_NEW_COMPANY_DUPLICATE_OLD_COMPANY })
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
    function resetTextError() {
        setMessageErr({
            privilege: "",
            image: "",
            remark: "",
        })
    }
    //--------------------------Modal
    function onShowModal() {
        setShowModal(true)
    }
    //----------------------------------------------------
    return (
        <div>
            <UserChangeCompanyModal
                showModal={showModal}
                setShowModal={setShowModal}
                setSelectNewCompany={setSelectNewCompany}
            />
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #007bff, #1e88e5)" }} color="primary">
                            <h4 className={classes.cardTitleWhite}>เปลี่ยนแปลงโครงการหลักที่ดูแลอยู่ในปัจจุบัน</h4>
                            <p className={classes.cardCategoryWhite}>Change main company</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={5} md={5}>
                                    <Label
                                        key={1}
                                        title="Username"
                                        value={userInfo.username}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={7} md={7}>
                                    <Label
                                        key={2}
                                        title="ชื่อ-นามสกุล"
                                        value={`${userInfo.first_name} ${userInfo.last_name}`}
                                    />
                                </GridItem>
                            </GridContainer>
                            <br></br>
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
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <Label
                                                        title="โครงการหลักที่ดูแลปัจจุบัน"
                                                        value={Store.companySelectedReducer.result ? Store.companySelectedReducer.result.company_name : ""}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                            <br></br>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <Label
                                                        title="โครงการหลักที่ดูแล (ใหม่)"
                                                        value={selectNewCompany.company_name}
                                                    />
                                                    <br></br>
                                                    <span style={{ color: "red" }}>{messageErr.new_company}</span>
                                                </GridItem>
                                            </GridContainer>
                                            <br></br>
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                                    <Button color="info"
                                                        onClick={onShowModal}
                                                        endIcon={<Icon style={{ fontSize: "25px" }}>flip_camera_android</Icon>}
                                                    >เลือกโครงการใหม่</Button>
                                                </GridItem>
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputFile
                                        title="เลือกรูปภาพหลักฐานการแจ้งเปลี่ยนโครงการหลักที่ User ดูแลอยู่ปัจจุบัน"
                                        setValue={setImage}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.image}</span>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="เหตุผลที่เปลี่ยนโครงการหลักที่ User ดูแลอยู่ปัจจุบัน"
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
                                onClick={onChangeMainCompanyClick}
                                endIcon={<Icon style={{ fontSize: "25px" }}>save</Icon>}
                            >บันทึก</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}


const mapStateToProps = ({ mainReducer }) => ({ mainReducer })

const mapDispatchToProps = {
    checkJWTTOKENAction,
    GetUserByID,
    ChangeMainCompanyUserAction
}
export default connect(mapStateToProps, mapDispatchToProps)(UserChangeCompany);