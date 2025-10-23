import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

    const {logout, user} = useContext(AuthContext)

    return (
        <>
            <div className="flex max-w-7xl justify-between p-4 flex-wrap mx-auto">
                <h1 className="self-center text-2xl font-semibold whitespace-nowrap">Task Manager</h1>
                <div className="flex p-4 items-center order-2 rtl:space-x-reverse space-x-6">
                    <h4 className="block text-sm text-gray-500 hover:underline">{user?.email}</h4>
                    <button onClick={logout} className="block text-sm hover:underline text-blue-600">Logout</button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
