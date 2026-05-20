import {useState} from "react";
import Navbar from"../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
    const [showSidebar, setShowSidebar]=useState(false);

    //role login
    const role="ADMIN";
    // const role="ANGGOTA";

    return (
        <div>
            <Navbar showMenu={true} onToggle={()=>setShowSidebar(!showSidebar)}/>
            <Sidebar role={role} showSidebar={showSidebar}/>
            <main className={`mt-14 pt-1 transition-all duration-300 ${showSidebar? "md:ml-64" :"ml-0"}`}><Outlet /></main>
        </div>
    ); 
}
