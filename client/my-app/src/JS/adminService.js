import axios from "axios"
import { useState } from "react"

const basisUrl="http://localhost:3002/"  
   
    export const addAdvertiser = (advertiser) => {
        return axios.post(`${basisUrl}advertiser/`,advertiser)
    }
    export const advertiserByEmailPassword = (advertiser) => {
        debugger
        return axios.post(`${basisUrl}advertiser/advertiserByEmailAndPassword`,advertiser)
    }
    export const addCustomer = (customer) => {
        return axios.post(`${basisUrl}customer/`,customer)
    }
    export const customerByEmailPassword = (customer) => {
       
        return axios.post(`${basisUrl}customer/customerByEmailPassword`,customer)
    }



