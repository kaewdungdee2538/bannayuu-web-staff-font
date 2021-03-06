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
            dispatch(setClearSelectCompany());
        }
    }
    function onCreateClick() {
        history.push("/user-add-select")
    }
    function onEditInformationClick() {
        history.push("/user-edit-info-select")
    }
    function onChangePrivilegeClick() {
        history.push("/user-change-privilege-select")
    }
    function onChangeCompanySelect() {
        history.push("/user-change-company-select")
    }
    function onAddOrDeleteCompanyList() {
        history.push("/user-addordelete-listcompany-select")
    }
    function onResetPassword() {
        history.push("/user-reset-password-listcompany-select")
    }
    //----------------------------------------------------
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader style={{ background: "linear-gradient(60deg, #007bff, #1e88e5)" }} color="primary">
                            <h4 className={classes.cardTitleWhite}>?????????????????????????????????????????????</h4>
                            <p className={classes.cardCategoryWhite}>User Management</p>
                        </CardHeader>
                        <CardBody>
                            <h3>???????????????????????????????????????</h3>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        onClick={onCreateClick}
                                        className={classesBtn.btnAdd}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>person_add</Icon>}
                                    >
                                        ??????????????????????????????????????????????????????
                                    </Button>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        onClick={onEditInformationClick}
                                        className={classesBtn.btnEdit}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>recent_actors</Icon>}
                                    >
                                        ????????????????????????????????????????????????????????????
                                    </Button>
                                </GridItem>
                            </GridContainer>
                            <br></br>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        onClick={onChangePrivilegeClick}
                                        className={classesBtn.btnAdd}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>admin_panel_settings</Icon>}
                                    >
                                        ?????????????????????????????????????????????????????????????????????????????????
                                    </Button>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        onClick={onChangeCompanySelect}
                                        className={classesBtn.btnEdit}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>storefront</Icon>}
                                    >
                                        ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </Button>
                                </GridItem>
                            </GridContainer>
                            <br></br>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        onClick={onAddOrDeleteCompanyList}
                                        className={classesBtn.btnAdd}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>add_business</Icon>}
                                    >
                                        ????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    </Button>
                                </GridItem>
                                <GridItem xs={12} sm={6} md={6}>
                                    <Button
                                        onClick={onResetPassword}
                                        className={classesBtn.btnEdit}
                                        endIcon={<Icon style={{ fontSize: "30px" }}>password</Icon>}
                                    >
                                        Reset Passowrd
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