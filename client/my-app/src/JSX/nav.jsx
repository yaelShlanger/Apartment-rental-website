import { NavLink } from "react-router-dom"
//  import "../CSS/nav.css"
import "../CSS/homePage.scss"


// אם השמות של הפונקציות שמופעלות ב-main הם c ו- setC



import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DehazeIcon from '@mui/icons-material/Dehaze';
import InterestsIcon from '@mui/icons-material/Interests';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { getCurrentUser } from "./main";
import { useState } from "react";
import { useSelector } from "react-redux";



export const Nav = () => {
    // -------------------------------------- nav
    // const cuser = useSelector(x => x.currentUser)

    // const nameorm = () => {
    //     // if (cuser.mail == manager.mail)
    //         return true
    //     return false
    // }


    const getCurrentUser = () => {
        return sessionStorage.getItem("currentUser");
    }

    return <>
        <div className="page-background">
            <div class="side-panel a">
                <div className="navbar">
                    <NavLink to='homePage ' id={'homepage'} > <DehazeIcon style={{ color: "white" }}></DehazeIcon></NavLink>
                    <ul>
                        <br></br>       <br></br>
                        <li><span class="entypo-doc-text-inv"></span><span class="menu-item"><NavLink to='allApartment' className={'link black'} id={'allApartment'} > <AddHomeWorkIcon style={{ color: "white" }}></AddHomeWorkIcon></NavLink></span></li>
                        <br></br>       <br></br> <br></br>
                        <li><span class="entypo-layout"></span><span class="menu-item"><NavLink to='login' className={'link black'} id={'login'}><AccountCircleIcon style={{ color: "white" }}></AccountCircleIcon></NavLink></span></li>
                        <br></br>      <br></br> <br></br>
                        <li><span class="entypo-rocket"></span><span class="menu-item"><NavLink to='signIn' className={'link black'} id={'signIn'}><GroupAddIcon style={{ color: "white" }}></GroupAddIcon></NavLink></span></li>
                        <br></br>      <br></br> <br></br>
                        {/* -------------------------------------- nav */}
                        {/* {nameorm()&&<label className='a' >מנהל/ת</label>} */}
                        
                        {getCurrentUser() === null && (
                            <li><span class="entypo-cog"></span><span class="menu-item" ><NavLink to='privateArea' className={'link black'} id={'privateArea'}><InterestsIcon style={{ color: "white" }}></InterestsIcon></NavLink></span></li>)}
                        <br></br>      <br></br> <br></br>
                        {getCurrentUser() === null && (
                            <li><span class="entypo-cog"></span><span class="menu-item" ><NavLink to='city' className={'link black'} id={'city'}><AddLocationAltIcon style={{ color: "white" }}></AddLocationAltIcon></NavLink></span></li>)}
                        <br></br>      <br></br> <br></br>
                        {getCurrentUser() === null && (
                            <li><span className="entypo-cog"></span><span className="menu-item"><NavLink to='category' className={'link black'} id={'category'}> <DashboardCustomizeIcon style={{ color: "white" }} /></NavLink></span></li>)}
                    </ul>
                </div>
            </div>
        </div>

    </>


}