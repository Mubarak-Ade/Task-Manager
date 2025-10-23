import React from "react";
import Home from "./Home";
import Box from "@mui/material/Box";
import SideBar from "../component/SideBar";
import Navbar from "../component/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Dashboard = () => {

    const theme = createTheme()

    return (
            <div className="flex">
                <SideBar />
                <div className="flex-1">
                    <Navbar />
                    <Home />
                </div>
            </div>
    );
};

export default Dashboard;
