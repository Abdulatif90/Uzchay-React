import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket  from './Basket';

export default function HomeNavbar() {
    const authMember = true; 
    return <div className="home-navbar">
       <Container className="navbar-container">
            <Stack className="menu">
                <Box>
                    <NavLink to={'/'}> 
                        <img className='brand-logo' src="/icons/burak.svg" alt="Burak brand logo" />
                    </NavLink>
                </Box>
               <Stack className="links">
                    <Box className={"hover-line"} >
                        <NavLink
                            to={'/'}
                            className={({ isActive }) => isActive ? "underline" : undefined}
                        >
                            Home
                        </NavLink>
                    </Box>
                    <Box className={"hover-line"}>
                        <NavLink
                            to={'/products'}
                            className={({ isActive }) => isActive ? "underline" : undefined}
                        >
                            Products
                        </NavLink>
                    </Box >
                    {authMember ? (
                        <Box className={"hover-line"}>
                            <NavLink
                                to={'/orders'}
                                className={({ isActive }) => isActive ? "underline" : undefined}
                            >
                                Orders
                            </NavLink>
                            <NavLink
                                to={'/member-page'}
                                className={({ isActive }) => isActive ? "underline" : undefined}
                            >
                                My Page
                            </NavLink>
                            <NavLink
                                to={'/help'}
                                className={({ isActive }) => isActive ? "underline" : undefined}
                            >
                                Help
                            </NavLink>
                        </Box>
                    ) : null}
                    {authMember ? (
                        <Box className={"hover-line"}>
                            <NavLink
                                to={'/member-page'}
                                className={({ isActive }) => isActive ? "underline" : undefined}
                            >
                                My Page
                            </NavLink>
                        </Box>
                    ) : null}
                    <Box className={"hover-line"}>
                        <NavLink
                            to={'/help'}
                            className={({ isActive }) => isActive ? "underline" : undefined}
                        >
                            Help
                        </NavLink>
                    </Box>
                     <Basket/>
                    {!authMember ? (
                        <Box>
                            <Button variant="contained" className="login-button">Login</Button>
                        </Box>
                    ) : (
                        <img
                        className="user-avatar"
                        src="/icons/default-user.svg"
                        alt="User avatar"
                        aria-haspopup={"true"} />
                    )}
                </Stack>
            </Stack>
            <Stack>Detail</Stack>
             <Stack className="header-frame">
                <Stack className="detail"> 
                <Box className = {"head-main-txt"}>World's Most delicious Cousine</Box>
                <Box className = "wel-txt">The Choice, not just a choice</Box>
                <Box className = "service-txt">24 hours service</Box>
                <Box className = "signup">
                    {!authMember ? (
                        <Button variant={"contained"} className="signup-button"> SIGN UP</Button>
                    ) : null} 
                    
                </Box>
                </Stack>
                <Box className="logo-frame">
                    <div className="logo-img"></div>
                </Box>
            </Stack>
        </Container>
    </div>
}