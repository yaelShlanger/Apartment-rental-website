import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { addApartment, allCategory, allCities, updateApartment } from '../JS/apartmentService';
import Swal from 'sweetalert2';

export const Form = ({ onClose,type }) => {

    const priceRef = useRef()
    const additivesRef = useRef()
    const numOfBedsRef = useRef()
    const addressRef = useRef()
    const imageRef = useRef()
    const descriptionRef = useRef()
    const apartmentNameRef = useRef("")

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [cityList, setCityList] = useState([]);


    const springProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    useEffect(() => {

        debugger
        allCategory()
            .then(x => {
                setCategoryList(x.data.category)
            })
            .catch(x => {
                console.log("category err");
            })

        allCities()
            .then(x => {
                setCityList(x.data.cities)
            })
            .catch(x => {
                console.log("city err");
            })

    }, []);

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append('advertiserId',localStorage.getItem('currentUser'))
        formData.append('price',priceRef.current.value)
        formData.append('additives',additivesRef.current.value)
        formData.append('numOfBeds',numOfBedsRef.current.value)
        formData.append('address',addressRef.current.value)
        formData.append( 'cityId' ,selectedCity)
        formData.append('categoryId',selectedCategory)
        formData.append('price',priceRef.current.value)
        formData.append('image', imageRef.current.files[0]);
        formData.append('description',descriptionRef.current.value)
        formData.append('apartmentName',apartmentNameRef.current.value)

        debugger
        if(type=="add"){
        addApartment(formData)
     
            .then(x => {
                Swal.fire("הדירה נוספה בהצלחה","","success")
            })
            .catch(x => {
                console.log("apartment err");
            })
        }
        else{
            updateApartment(localStorage.getItem('currentUser'),formData)
          
            .then(x => {
                Swal.fire("הדירה התעדכנה בהצלחה","","success")
            })
            .catch(x => {
                console.log("apartment err");
            })
        }
        onClose();
    };
    const cancel = () => {
        onClose();
    }
    const categoryChange = (e) => {
        debugger
        setSelectedCategory(e.target.value)
    }
    const cityChange = (e) => {
        setSelectedCity(e.target.value)
    }

    return (

        <animated.div style={{ ...springProps, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)' }}>

            <div className="login-box" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '8px', backgroundColor: '   rgba(0,0,0,.5)' }}>
                <h1>הוספת דירה למאגר</h1>
                <form onSubmit={handleSubmit} action="">

                    <div className="user-box">
                        <input type="text" name="apartmentName" ref={apartmentNameRef} required />
                        <label>שם הדירה:</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name="description" ref={descriptionRef} required />
                        <label>תאור הדירה</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name="address" ref={addressRef} required />
                        <label>כתובת</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name="numOfBeds" ref={numOfBedsRef} required />
                        <label>כמות מיטות</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name="additives" ref={additivesRef} required />
                        <label>תוספים</label>
                    </div>
                    <div className="user-box">
                        <input   type="text" name="price" ref={priceRef} required />
                        <label>מחיר</label>
                    </div>
                    <div className="user-box">
                        <input type="file" name="image" ref={imageRef} required />
                       
                    </div>
                    <div className="user-box">
                        <select value={selectedCategory} onChange={categoryChange}>
                            <option value="">בחר קטגוריה</option>
                            {categoryList.map((category) => (
                                <option key={category.categoryName} value={category._id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="user-box">
                        <select value={selectedCity} onChange={(e) => cityChange(e)}>
                            <option value="">בחר עיר</option>
                            {cityList.map((city) => (
                                <option key={city.cityName} value={city._id}>
                                    {city.cityName}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* כפתור שליחה */}
                    <button type='button' onClick={cancel} style={{ width: '100px' }}>ביטול</button>
                    <button type="submit">שליחה</button>
                </form>
            </div>
        </animated.div>
    );
};

