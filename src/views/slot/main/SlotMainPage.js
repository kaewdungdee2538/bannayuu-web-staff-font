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
import { setClearSelectCompany } from "actions/company/company-selected.action"

const useStyles = makeStyles(styles);

function SlotMainPage() {
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
            dispatch(setClearSelectCompany());
        }
    }
    function onCreateClick() {
        history.push("/slot-add")
    }
    function onNotUseClick() {
        history.push("/slot-not-use")
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
                                        onClick={onCreateClick}
                                        className={classesBtn.btnAdd}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>person_add</Icon>}
                                    >
                                        เพิ่มเลข Slot
                                    </Button>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        onClick={onNotUseClick}
                                        className={classesBtn.btnEdit}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>recent_actors</Icon>}
                                    >
                                        ตรวจสอบเลข Slot
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
export default connect(mapStateToProps, mapDispatchToProps)(SlotMainPage);