import { useRef } from "react"
import swal from "sweetalert"
import { addAdvertiser, addCustomer } from "../JS/adminService"
import { useNavigate } from "react-router-dom"

export const SignIn = () => {

    const emailRef = useRef()
    const nameRef = useRef()
    const additionalPhoneRef = useRef()
    const phoneRef = useRef()
    const passRef = useRef()
    const nav = useNavigate()

    const errors = (error) => {
        const statusCode = error.response.status;
        switch (statusCode) {
            case 409:
                swal("", "אימייל קיים במערכת. נא לבחור כתובת אחרת", "error");
                break;
            case 404:
                swal("", "שגיאת מערכת. נסה שוב בעוד כמה דקות", "error");
                break;
            case 500:
                swal("", "שגיאת מערכת. נסה שוב בעוד כמה דקות", "error");
                break;
            default:
                swal("", "An unexpected error occurred", "error");
                break;
        }
    }

    const signAdv = () => {
        if (nameRef.current.value === "" || emailRef.current.value === "" || phoneRef.current.value === ""  || passRef.current.value === "") {
            swal("!", "יש למלא את השדות החסרים", "error");  
        } 
        else{
        const user = {
            advertiserName: nameRef.current.value,
            advertiserEmail: emailRef.current.value,
            advertiserPassword: passRef.current.value,
            phone: phoneRef.current.value,
            // additionalPhone:additionalPhoneRef.current.value,
        }
        debugger
        addAdvertiser(user).then(x =>
            swal("Hello!", "sign successfully!", "success"),
            nav("/allApartment"))
            .catch(error => {
                errors(error);
            })
        }
    }

    const signCus = () => {
        if (nameRef.current.value === "" || emailRef.current.value === "" || phoneRef.current.value === ""  || passRef.current.value === "") {
            swal("!", "יש למלא את השדות החסרים", "error");  
        } 
        else{
        debugger
        const user = {
            customerName: nameRef.current.value,
            customerEmail: emailRef.current.value,
            customerPassword: passRef.current.value,
            phone: phoneRef.current.value,
            // additionalPhone:additionalPhoneRef.current.value,
        }
        addCustomer(user).then(x =>
            swal("Hello!", "sign successfully!", "success"),
            nav("/allApartment"))
            .catch(error => {
                errors(error);
            })
        }
    }

    return <>
        <>
            <div className="all">
                <div className="login-box">
                    <h2>אני רוצה להצטרף :)</h2>
                    <form action="">
                        <div className="user-box">
                            <input type="text" name="email" ref={emailRef} required />
                            <label> אימייל</label>
                        </div>
                        <div className="user-box">
                            <input type="text" name="name" ref={nameRef} required />
                            <label htmlFor="name">שם</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" ref={passRef} required />
                            <label htmlFor="password">סיסמא</label>
                        </div>
                        <div className="user-box">
                            <input type="phone" name="phone" ref={phoneRef} required />
                            <label htmlFor="phone">טלפון</label>
                        </div>
                        <div className="user-box">
                            <input type="additionalphone" name="additionalphone" ref={additionalPhoneRef} id="phone2" />
                            <label htmlFor="additionalphone">טלפון נוסף</label>
                        </div>
                        <button type="button" onClick={signAdv}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            הצטרף כמפרסם
                        </button>
                        <button type="button" onClick={signCus}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            הצטרף כלקוח
                        </button>
                    </form>
                </div>
            </div>
        </>


    </>
}