import { useEffect, useState } from "react"
import { allApartment, allCities, apartmentByCityId, apartmentByIP } from "../JS/apartmentService"
import { ApartmentCard } from "./apartmentCard"
import "../CSS/apartment.css"


export const AllApartment = () => {
  let [r, setR] = useState([])
  const [selectedCity, setSelectedCity] = useState();
  const [cityList, setCityList] = useState([]);

  useEffect(() => {

    allApartment().then(x => {
    setR(x.data.apartment)

    allCities().then(x => {
      setCityList(x.data.cities)
    })
    })  
  }, []);
 
  const sendIp = () => {
    debugger
    apartmentByIP()
      .then(x => {
        setR(x.data);
      })
      .catch(error => {
        console.log('שגיאה בקבלת מידע:', error);
      });
  };

  const cityChange = (e) => {
    debugger
    if(e.target.value=="הכל"){
    
      allApartment().then(x => {
        setR(x.data.apartment)})
    }
   else{
    apartmentByCityId(e.target.value).then(x => {
      setR(x.data)
    })}
   }
  return <>
  <div id="body">
    <button onClick={sendIp}>חפש דירות בעיר שלי</button>

    <div className="user-box">
                        <select value={selectedCity} onChange={(e) => cityChange(e)} style={{ width:"300px" }}>
                            <option value="" disabled>בחר עיר</option>
                            <option value="הכל">הכל</option>
                            {cityList.map((city) => (
                                <option key={city.cityName} value={city._id}>
                                    {city.cityName}
                                </option>
                            ))}
                        </select>
           </div>

    <div id="flex">
      {r && r.map((i) => <ApartmentCard apartmentName={i.apartmentName} description={i.description} image={i.image} address={i.address} numOfBeds={i.numOfBeds} additives={i.additives} price={i.price} id={i._id} ></ApartmentCard>)}
    </div>
    </div>
  </>
}


