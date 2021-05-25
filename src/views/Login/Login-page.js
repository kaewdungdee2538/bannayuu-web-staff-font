import { useState } from 'react'
import swal from 'sweetalert';
import { isNotEngCharOrNumber } from 'utils/formatCharacter.util'
import { connect } from 'react-redux'
import { loginAction } from '../../actions/login/login.action'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import logo from './logo-big.svg'

function LoginPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    //---------------State
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function onLoginClick(e) {
        e.preventDefault();
        if (loginMiddleware()) {
            dispatch(loginAction(history, { username: userName, password: password }))
        }
    }
    function loginMiddleware() {
        if (!userName) {
            swal("Warning!", "กรุณากรอก Username", "warning");
            return false;
        } else if (!password) {
            swal("Warning!", "กรุณากรอก Password", "warning");
            return false;
        } else if (isNotEngCharOrNumber(userName)) {
            swal("Warning!", "Username ต้องเป็นอักษรภาษาอังกฤษ หรือตัวเลขเท่านั้น", "warning");
            return false;
        } else if (isNotEngCharOrNumber(password)) {
            swal("Warning!", "Password ต้องเป็นอักษรภาษาอังกฤษ หรือตัวเลขเท่านั้น", "warning");
            return false;
        }
        return true;
    }
    //-----------------------------------------------
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src={logo} alt="IMG" />
                    </div>
                    <form className="login100-form validate-form">
                        <span className="login100-form-title">
                            Bannayuu Admin Login
                    </span>
                        {/* <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz"> */}
                        <div className="wrap-input100 validate-input" data-validate="Username is required">
                            <input className="input100"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={userName}
                                onChange={event => setUserName(event.target.value)}
                            />
                            <span className="focus-input100" />
                            <span className="symbol-input100">
                                <i className="fa fa-user" aria-hidden="true" />
                            </span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input
                                className="input100"
                                type="password"
                                name="pass"
                                placeholder="Password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                            <span className="focus-input100" />
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true" />
                            </span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button
                                className="login100-form-btn"
                                onClick={e => onLoginClick(e)}
                            >
                                Login
                            </button>
                        </div>
                        <div className="text-center p-t-136">
                            <a className="txt2" href="#">
                                Power by Creative Innovation Technology
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = ({ loginReducer,mainReducer }) => ({ loginReducer,mainReducer })

const mapDispatchToProps = {
    loginAction
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);