import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { checkJWTTOKENAction } from "../../actions/main/main.action"
import { useSelector } from 'react-redux'
function MainPage() {
    const authStore = useSelector(store => store);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        loadMainForm();
    }, []);
    function loadMainForm() {
        const valuesObj = authStore.loginReducer.result;
        if (!valuesObj) {
            history.push("/login");
        } else {
            dispatch(checkJWTTOKENAction(history, authStore));
        }
    }
    return (
        <div>
            <h1>Main</h1>
        </div>
    );
}

const mapStateToProps = ({ mainReducer }) => ({ mainReducer })

const mapDispatchToProps = {
    checkJWTTOKENAction
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);