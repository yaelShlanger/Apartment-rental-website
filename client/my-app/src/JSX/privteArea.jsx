import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Form } from './addApartment';
import { useEffect } from "react";
import { addApartment, apartmentByAdvertiserId } from "../JS/apartmentService";
import { ApartmentCard } from "./apartmentCard";
import "../CSS/apartment.css"



 export const Add = () => {
  const [type,setType]=useState("")
  const [isFormVisible, setFormVisible] = useState(false);


      let [r, setR] =useState([])
  const springProps = useSpring({
    opacity: isFormVisible ? 1 : 0,
    height: isFormVisible ? 'auto' : 0,
  });

  const AddApartment = () => {
    setType("add")
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };
    useEffect(()=>{
      debugger
        apartmentByAdvertiserId(localStorage.getItem('currentUser'))
        .then(x=>{
            setR(x.data)
  })
  .catch(x=>{
    console.log("err");
  })

    },[]); 
  return (
    
    <div>
      
      <button onClick={AddApartment}  style={{ width: '200px' }}>הוסף דירה</button>
   
      <animated.div style={springProps}>
        {isFormVisible && <Form type={type} onClose={handleCloseForm}/>}
      </animated.div>

      {r?.map((i) => <ApartmentCard  apartmentName={i.apartmentName}  description={i.description} 
  image={i.image}  address={i.address}  numOfBeds={i.numOfBeds}  additives={i.additives}
    price={i.price} id={i._id}></ApartmentCard>)}
    </div>

  )
}