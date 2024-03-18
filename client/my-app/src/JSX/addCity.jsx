import { useEffect, useRef, useState } from "react";
import { addCity, allCities } from "../JS/apartmentService";
import Swal from "sweetalert2";

export const AddCity = () => {
    const nameRef = useRef()
    const [cityList, setCityList] = useState([]);
    useEffect(() => {

        debugger
        allCities()
            .then(x => {
                setCityList(x.data.cities)
            })
            .catch(x => {
                console.log("city err");
            })
    }, []);
    const add = () => {
        debugger
        const newC = { cityName: nameRef.current.value }
        addCity(sessionStorage.getItem('currentUser'), newC)
            .then(x => {
                console.log("work!")
                Swal.fire("הוספת עיר בוצעה בהצלחה", "", 'success')
            })
            .catch(x => {
                console.log("city err");
            })
    }

    return <>
        <div className="all">
            <div className="login-box">
                {cityList?.map((i) => <p>{i.cityName}</p>)}
                <form style={{ textAlign: 'center' }}>
                    <input type="text" name="email" placeholder="הזן עיר כאן" ref={nameRef} required style={{ direction: 'rtl', borderRadius: '25%' }} />
                    <button onClick={add} ></button>
                </form>
            </div>
        </div>
    </>
}