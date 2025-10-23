import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import Avatar from "@mui/material/Avatar";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import Link from "@mui/material/Link";
import { Link, useNavigate } from "react-router";

const Login = () => {

    const theme = createTheme()
    const navigate = useNavigate()
    
    const { setToken, setUser, API } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            navigate('/')
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography component="h1" variant="h4" color="initial" className="">Login</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                          id="email"
                          label="Email"
                          value={email}
                          margin="normal"
                          autoComplete="email"
                          fullWidth
                          autoFocus
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                          id="password"
                          label="Password"
                          name="password"
                          value={password}
                          type="password"
                          margin="normal"
                          fullWidth
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="outlined" fullWidth sx={{
                            mt: 3,
                            mb: 2
                        }}>
                            Login
                        </Button>
                        <Link to="/register">Register</Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
