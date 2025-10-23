import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = () => {
    const theme = createTheme();
    const navigate = useNavigate();

    const { setToken, setUser, API } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/register", {name, email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Register failed");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h4"
                        color="initial"
                        className=""
                    >
                        Register
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            id="name"
                            label="Name"
                            value={name}
                            margin="normal"
                            autoComplete="name"
                            fullWidth
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <Button
                            type="submit"
                            variant="outlined"
                            fullWidth
                            sx={{
                                mt: 3,
                                mb: 2,
                            }}
                        >
                            Login
                        </Button>
                        <Link to="/login">Login</Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;
