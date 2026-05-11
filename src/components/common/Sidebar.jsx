import React from "react";
import { NavLink } from "react-router-dom";

const menuByRole ={
    admin: [
        // {name:"Dashboard", path:"/admin/dashboardadmin"},
        "Dashboard",
        "Kelola Buku",
    ],
    anggota: [
        "Dashboard",
        "Kartu Anggota",
    ],
};

export default function Sidebar({role, showSidebar}) {
    const menus= menuByRole[role] || [];

    return (
        <aside className={
            showSidebar
            ? "bg-pink-200 w-64 fixed top-16 left-0 bottom-0 z-40 overflow-y-auto transition-all duration-300 translate-x-0"
            : "bg-pink-200 w-64 fixed top-16 left-0 bottom-0 z-40 overflow-y-auto transition-all duration-300 -translate-x-full"}>
            <div className="p-5">
                <div className="clex flex-col items-center mb-5">
                    <div className="w-14 h-14 bg-white rounded-full"></div>
                    <h2 className="font-bold mt-2 uppercase">Saya</h2>
                    <div className="bg-white px-4 rounded-full text-sm font-semibold">{role}</div>
                </div>
                <div className="bg-pink-400 px-3 py-2 font-bold">MAIN NAVIGATION</div>
                <div className="mt-6 space-y-3 font-semibold">
                    {menus.map((menu, index)=>(<NavLink key={index} to={menu.path} className={({isActive})=>`block px-3 py-2 rounded transition ${isActive? "bg-pink-400 text-white":"hover:bg-pink-300"}`}>{menu.name}</NavLink>))}
                </div>
            </div>
        </aside>
    );   
}