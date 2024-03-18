import { useEffect, useRef, useState } from "react";
import { addCategory, allCategory } from "../JS/apartmentService";
import Swal from "sweetalert2";


export const AddCategory = () => {
    const nameRef = useRef()
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        debugger
        allCategory()
            .then(x => {
                setCategoryList(x.data.category)
            })
            .catch(x => {
                console.log("category err");
            })
    }, []);

    const add = () => {
        debugger
        const newC = { categoryName: nameRef.current.value }

        addCategory(sessionStorage.getItem('currentUser'), newC)
            .then(x => {
                console.log("work!")
                Swal.fire("הוספת קטגוריה בוצעה בהצלחה", "", 'success')
            })
            .catch(x => {
                console.log("city err");
            })
    }
    return <>
        <div className="all">
            <div className="login-box">
                {categoryList?.map((i) => <p>{i.categoryName}</p>)}
                <form className="Add" style={{ textAlign: 'center' }}>
                    <input type="text" placeholder="שם הקטגוריה" ref={nameRef} required style={{ direction: 'rtl', borderRadius: '25%' }} />
                    <button onClick={add} style={{ width: '400px' }}></button>
                </form>
            </div>
        </div>
    </>
}