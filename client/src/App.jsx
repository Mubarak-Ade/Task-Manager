import "./App.css";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import Register from "./page/Register";
import Login from "./page/Login";
import Home from "./page/Home";
import Navbar from "./component/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./page/Dashboard";
import Box from "@mui/material/Box";
import SideBar from "./component/SideBar";

const theme = createTheme();

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
