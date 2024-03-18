
import { Route, Routes } from "react-router-dom"
import { Login } from './login3'
import { AllApartment } from "./allApartment"
import { ApartmentCard } from "./apartmentCard"
import { SignIn } from "./signIn"
import { Details } from "./details"
import { HomePage } from "./homePage"
import { Add } from "./privteArea"
import { Form } from "./addApartment"
import { AddCategory } from "./addCategory"
import { AddCity } from "./addCity"
import { Nav } from "./nav"



export const Routing = () => {
    return <>
      
        <Routes>
            <Route path={'./'} element={<AllApartment></AllApartment>}></Route>
            <Route path={'privateArea'} element={<Add></Add>}></Route>
            <Route path={'homePage'} element={<HomePage></HomePage>}></Route>
            <Route path={'/allApartment'} element={<AllApartment></AllApartment>}></Route>
            <Route path={'apartmentCard'} element={<ApartmentCard></ApartmentCard>}></Route>
            <Route path={'login'} element={<Login></Login>}>
               <Route path={'nav'} element={<Nav></Nav>}></Route>
            </Route>
            <Route path={'signIn'} element={<SignIn></SignIn>}></Route>
            <Route path={'addApartment'} element={<Form></Form>}></Route>
            <Route path={'category'} element={<AddCategory></AddCategory>}></Route>
            <Route path={'city'} element={<AddCity></AddCity>}></Route>

            <Route path={`details/:apartmentName/:description/:address/:numOfBeds/:additives/:price/:id`} element={<Details></Details>}></Route>  
        </Routes>
    </>
}