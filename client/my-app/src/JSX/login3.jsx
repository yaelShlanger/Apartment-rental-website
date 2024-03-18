import { useRef, useState } from "react";
import Swal from 'sweetalert2';
import "../CSS/login3.css"
import { advertiserByEmailPassword, customerByEmailPassword } from "../JS/adminService";
import swal from "sweetalert";
import { Nav } from "./nav";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../JS/func";
import { useDispatch } from "react-redux";

//טופס התחברות
export const Login = () => {
    debugger
    const passwordref = useRef();
    const emailref = useRef();
    const nav = useNavigate()
    const dispatch=useDispatch()

    const errors = (error) => {
        const statusCode = error.response.status;
        switch (statusCode) {
            case 403:
                swal("", "רשת נפלה", "error");
                break;
            case 404:
                swal("", "משתמש לא קיים. יש לעבור להרשמה", "error");
                nav("/signIn");
                break;
            case 500:
                swal("", "סיסמא שגויה!", "error");
                break;
            default:
                swal("", "An unexpected error occurred", "error");
                break;
        }
    }

    const aConnect = () => {
        debugger;
        if (passwordref.current.value === "" || emailref.current.value === "") {
            swal("!", "יש למלא את השדות החסרים", "error");
            
        }
        else
        {
        const user = { advertiserPassword: passwordref.current.value, advertiserEmail: emailref.current.value };
        advertiserByEmailPassword(user)
            .then(x => {
                sessionStorage.setItem('currentUser', x.data.currentUser);
                localStorage.setItem('jwt', x.data.token);
                swal("Hello!", "login successfully!", "success");
                nav("/allApartment");
            })
            .catch(error => {
                errors(error);
            })
    }}

    const cConnect = () => {
        debugger
        if (passwordref.current.value === "" || emailref.current.value === "") {
            swal("!", "יש למלא את השדות החסרים", "error");
        }
        else{
        const user = { customerPassword: passwordref.current.value, customerEmail: emailref.current.value }
        customerByEmailPassword(user).then(x => {
            dispatch(setCurrentUser(x.data.currentUser))
            sessionStorage.setItem('currentUser', x.data.currentUser)
            localStorage.setItem('jwt', x.data.token)
            swal("Hello!", "login successfully!", "success")
            nav("/allApartment");
        })
            .catch(error => {
                errors(error);
            })
    }
    }
    return (
        <>
            <div className="all">
                <div className="login-box">
                    <h2>ברוך שובך</h2>
                    <form action="">
                        <div className="user-box">
                            <input type="text" name="username" ref={emailref} required />
                            <label> אימייל</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" ref={passwordref} required />
                            <label htmlFor="password">סיסמא</label>
                        </div>
                        <button type="button" onClick={cConnect}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            לקוח
                        </button>
                        <button type="button" onClick={aConnect}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            מפרסם
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

