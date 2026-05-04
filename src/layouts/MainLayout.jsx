import {useState} from "react";
import Navbar from"../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

export default function MainLayout({children, role}) {
    return (
        <div>
            <Navbar />
            <div className="flex"><Sidebar role="admin" /></div>
            <main className="flex-1 p-6 bg-gray-100 min-h-screen">
                {children}
            </main>
        </div>
    );
}