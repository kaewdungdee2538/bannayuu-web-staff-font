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
import TransferList from "components/TransferList/TransferList"
import Label from "components/Label/Label"
import InputFile from "components/Input/InputFile"
import CustomInput from "components/CustomInput/CustomInput.js";
import { checkJWTTOKENAction } from "actions/main/main.action"
import { GetCompanyListAllAction } from "actions/company/company-list.action"
import { GetUserByID } from "actions/user/user-get-info.action"
import { AddOrDeleteCompanyListUserAction } from "actions/user/user-addordelete.action"
import swal from 'sweetalert';
import {
    MESSAGE_COMPANY_ID_NOTFOUND,
    MESSAGE_REMARK_SPECIAL,
    MESSAGE_REMARK_NOT_FOUND,
    MESSAGE_NOTSELECTIMAGE,
    MESSAGE_FILE_IMAGE_INVALID,
} from "constants/message.constant"
import { IsHomeProbitSpecial } from "utils/formatCharacter.util"
import { getExtension, isImage } from "utils/funcImage.utils"

const useStyles = makeStyles(styles);

function UserAddOrDeleteListCompany() {
    const history = useHistory();
    const classes = useStyles();
    // const classesBtn = buttonStyle();
    const Store = useSelector(state => state)
    const dispatch = useDispatch();
    //-----------------state
    const [userInfo, setUserInfo] = useState({
        username: "",
        company_list: null
    })
    const [messageErr, setMessageErr] = useState({
        companylist: ""
    })
    const [image, setImage] = useState(null)
    const [remark, setRemark] = useState("");
    const [companyListItemRight, setCompanyListItemRight] = useState([]);
    const [companyListItemLeft, setCompanyListItemLeft] = useState([]);
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
            history.push("/admin/user-addordelete-listcompany-select");
        } else if (!userStore) {
            history.push("/admin/user-addordelete-listcompany-list");
        } else {
            dispatch(checkJWTTOKENAction(history, Store));
            dispatch(GetCompanyListAllAction(history, authStore))
            const valuesObj = {
                company_id: companyStore.company_id,
                employee_id: userStore.employee_id
            }
            const getData = await GetUserByID(dispatch, valuesObj, authStore)
            if (getData.error) {
                swal("Warning!", getData.message, "warning").then(() => {
                    history.push("/admin/user-addordelete-listcompany-list");
                })
            } else {
                const result = getData.result;
                const company_list = JSON.parse(result.company_list)
                setUserInfo({
                    username: result.username,
                    first_name:result.first_name_th,
                    last_name:result.last_name_th,
                    company_list,
                })

            }
        }
    }
    if (Store.companyListGetAllReducer.result.length > 0 && companyListItemLeft.length === 0 && companyListItemRight.length === 0 && userInfo.company_list) {
        const company_list_from_get = userInfo.company_list ? userInfo.company_list : [];

        const company_list_right = company_list_from_get.map((comList) => {
            const comp_list = Store.companyListGetAllReducer.result.map(item => {
                return { value: item.company_name, id: item.company_id }
            }).filter(fil => fil.id == comList)
            return comp_list[0];
        }).filter(fil => fil.id != Store.companySelectedReducer.result.company_id)

        const company_list_left = Store.companyListGetAllReducer.result.map(item => {
            return { value: item.company_name, id: item.company_id }
        }).filter(function (fil) {
            return company_list_from_get.indexOf(fil.id) < 0
        })


        setCompanyListItemRight(company_list_right);
        setCompanyListItemLeft(company_list_left);
    }

    //-----------------------On Create Click
    function onChangeAddOrDeleteCompanyListClick() {
        const company_id = parseInt(Store.companySelectedReducer.result.company_id)
        const employee_id = parseInt(Store.userSelectReducer.result.employee_id)
        const company_list_right = companyListItemRight.map(item => item.id)
        const company_list = [company_id, ...company_list_right]
        const valuesObj = {
            image,
            company_list: JSON.stringify(company_list),
            remark,
            company_id: company_id.toString(),
            employee_id: employee_id.toString()
        }
        if (addOrDeleteCompanyListUserMiddleware(valuesObj)) {
            dispatch(AddOrDeleteCompanyListUserAction(history, valuesObj, Store.loginReducer.result));
        }
    }
    //-----------------------Middleware for Create 
    function addOrDeleteCompanyListUserMiddleware(valuesObj) {
        resetTextError();
        if (!valuesObj.company_id) {
            swal("Warning!", MESSAGE_COMPANY_ID_NOTFOUND, "warning");
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
    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #007bff, #1e88e5)" }} color="primary">
                            <h4 className={classes.cardTitleWhite}>เพิ่ม/ลด โครงการในการดูแลของผู้ใช้งาน</h4>
                            <p className={classes.cardCategoryWhite}>Add/delete company list</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={5} md={5}>
                                    <Label
                                        title="Username"
                                        value={userInfo.username}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={7} md={7}>
                                    <Label
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
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputFile
                                        title="เลือกรูปภาพหลักฐานการแจ้งเปลี่ยนแปลงโครงการที่ผู้ใช้งานดูแล"
                                        setValue={setImage}
                                    />
                                    <span style={{ color: "red" }}>{messageErr.image}</span>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="เหตุผลที่เปลี่ยนแปลงโครงการที่ผู้ใช้งานดูแล"
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
                                onClick={onChangeAddOrDeleteCompanyListClick}
                                endIcon={<Icon style={{ fontSize: "25px" }}>save</Icon>}
                            >บันทึก</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}


const mapStateToProps = ({ mainReducer, companyListGetAllReducer }) => ({ mainReducer, companyListGetAllReducer })

const mapDispatchToProps = {
    checkJWTTOKENAction,
    GetCompanyListAllAction,
    GetUserByID,
    AddOrDeleteCompanyListUserAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(UserAddOrDeleteListCompany);