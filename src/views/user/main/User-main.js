import { styles } from "views/styles/card.style"
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from '@material-ui/core/Icon';
import { checkJWTTOKENAction } from "actions/main/main.action"
import { buttonStyle } from "utils/btnStyle.utils"
const useStyles = makeStyles(styles);

function UserMain() {
    const history = useHistory();
    const classes = useStyles();
    const classesBtn = buttonStyle();
    const Store = useSelector(state => state)
    const dispatch = useDispatch();
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

    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #007bff, #1e88e5)" }} color="primary">
                            <h4 className={classes.cardTitleWhite}>จัดการผู้ใช้งาน</h4>
                            <p className={classes.cardCategoryWhite}>User Management</p>
                        </CardHeader>
                        <CardBody>
                            <h3>เลือกทำรายการ</h3>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        onClick={() => { history.push("/admin/user-add")}}
                                        className={classesBtn.btnAdd}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>person_add</Icon>}
                                    >
                                        เพิ่มผู้ใช้งานใหม่
                                    </Button>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        className={classesBtn.btnEdit}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>recent_actors</Icon>}
                                    >
                                        แก้ไขข้อมูลผู้ใช้งาน
                                    </Button>
                                </GridItem>
                            </GridContainer>
                            <br></br>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        className={classesBtn.btnAdd}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>admin_panel_settings</Icon>}
                                    >
                                        เปลี่ยนสิทธิ์เข้าใช้งานระบบ
                                    </Button>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        className={classesBtn.btnEdit}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>storefront</Icon>}
                                    >
                                        เปลี่ยนโครงการหลักที่ผู้ใช้งานอยู่ปัจจุบัน
                                    </Button>
                                </GridItem>
                            </GridContainer>
                            <br></br>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        className={classesBtn.btnAdd}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>add_business</Icon>}
                                    >
                                        เพิ่มโครงการในการดูแลให้กับผู้ใช้งาน
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div >
    );
}


const mapStateToProps = ({ mainReducer }) => ({ mainReducer })

const mapDispatchToProps = {
    checkJWTTOKENAction
}
export default connect(mapStateToProps, mapDispatchToProps)(UserMain);