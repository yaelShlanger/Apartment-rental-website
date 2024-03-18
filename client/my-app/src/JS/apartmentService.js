import axios from "axios"

const basisUrl = "http://localhost:3002/"
const token=localStorage.getItem('jwt')
//שליפת כל הדירות
export const allApartment = () => {
    return axios.get(`${basisUrl}apartment/`)
}
//שליפת כל הקטגוריות
export const allCategory = () => {
    return axios.get(`${basisUrl}category/`,{headers:{'authorization':token}})
}
//שליפת כל הערים
export const allCities = () => {
    return axios.get(`${basisUrl}city/`,{headers:{'authorization':token}})
}
//הוספת קטגוריה
export const addCategory = (id,category) => {
    return axios.post(`${basisUrl}category/${id}`,category,{headers:{'authorization':token}})
}
// הוספת דירה 
export const addApartment = (formData) => {
    return axios.post(`${basisUrl}apartment`,formData,{headers:{'authorization':token, 'Content-Type': 'multipart/form-data' }})
}
//עדכון דירה
export const updateApartment = (id,apartment) => {
    debugger
    return axios.put(`${basisUrl}apartment/${id}`,apartment,{headers:{'authorization':token}})
}
//מחקית דירה
export const deleteApartment = (id,apartment) => {
    debugger
    return axios.delete(`${basisUrl}apartment/${id}/${apartment}`,{headers:{'authorization':token}}) 
}
//הוספת עיר
export const addCity = (id,city) => {
    return axios.post(`${basisUrl}city/${id}`,city)
}
// הצגת דירות לפי מפרסם
export const apartmentByAdvertiserId = (id) => {
    debugger
    return axios.get(`${basisUrl}apartment/advertiserId/${id}`,{headers:{'authorization':token}})
}
//הצגת דירות לפי עיר
export const apartmentByCityId = (id) => {
    debugger
    return axios.get(`${basisUrl}apartment/cityId/${id}`)
}
// הצגת דירות לפי קטגוריה
export const apartmentByCategoryId = (id) => {
    return axios.get(`${basisUrl}apartment/categoryId/${id}`)
}
//הצגת דירות לפי ip של עיר
export const apartmentByIP = () => {
    debugger
    // קבלת ה-IP
    return axios.get('https://api.ipify.org?format=json') // החזרת ה-Promise
    .then(response => {
      const userIp = response.data.ip;
      // החזרת ה-Promise מהבקשה הבאה
      return axios.get(`${basisUrl}apartment/cityIp/${userIp}`);
    });
}   
