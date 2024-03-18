import { useNavigate, useParams } from "react-router-dom"
import { deleteApartment } from "../JS/apartmentService"
import swal from "sweetalert"
import { useState } from "react"
import { useSpring, animated } from 'react-spring';
import { Form } from "./addApartment";
import "../CSS/login3.css"

export const Details = () => {

    let p = useParams()
    const nav=useNavigate()
    const [type,setType]=useState("")
    const [isFormVisibleUpdate, setFormVisibleUpdate] = useState(false);
    const [isFormVisible, setFormVisible] = useState(false);

    const deApartment = () => {
        debugger
        deleteApartment(sessionStorage.getItem("currentUser"),p.id)
            .then(x => {swal("", "delete successfully!", "err")
             nav(`/allApartment`)
          })
    }
    const springProps = useSpring({
        opacity: isFormVisible ? 1 : 0,
        height: isFormVisible ? 'auto' : 0,
      });
    const UpdateApartment = () => {
        debugger
        setType("update")
        setFormVisibleUpdate(true);
      };
      const handleCloseForm = () => {
        setFormVisible(false);
      };
    return <>
      <form action="">
      <div className="all">
      <div className="login-box text">
   <br></br><br></br>
   
        <p>{p.apartmentName}</p>
        <p>{p.description}</p>
        <p>{p.image}</p>
        <p>{p.address}</p>
        <p>{p.numOfBeds}</p>
        <p>{p.additives}</p>
        <p>{p.price}</p>
        
        <button type="button" onClick={deApartment}> 
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>מחיקת דירה</button>
        <button type="button" onClick={UpdateApartment}> 
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>עדכן דירה</button>
        <animated.div style={springProps}>
        {isFormVisibleUpdate && <Form type={type} onClose={handleCloseForm} />}
      </animated.div>
      </div>
      </div>
      
      </form>
    </>
}