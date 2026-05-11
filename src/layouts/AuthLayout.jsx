import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return(
        <div>
            <Navbar showMenu={false}/>
            <Outlet />
        </div>
    )
}