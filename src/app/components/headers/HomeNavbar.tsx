import { Box, Button, Container, Stack, ListItemIcon, Menu, MenuItem, IconButton, Drawer, useMediaQuery, useTheme} from "@mui/material";
import { NavLink } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import Basket  from './Basket';
import { useGlobals } from '../../hooks/useGlobals'; 
import { serverApi } from "../../../lib/config";
import { Logout, Menu as MenuIcon, Close } from "@mui/icons-material";
import { useState } from "react";


interface HomeNavbarProps {
    cartItems: CartItem[]
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void; 
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
    anchorEl: HTMLElement | null;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;

}
    export default function HomeNavbar(props: HomeNavbarProps) {
    const {
        cartItems,
        onAdd,
        onDelete,
        onDeleteAll,
        onRemove,
        setSignupOpen,
        setLoginOpen,
        anchorEl,
        handleCloseLogout,
        handleLogoutClick,
        handleLogoutRequest,
    } = props;
    const { authMember } = useGlobals();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className="container home-navbar">
        <Container className="navbar-container">
            <Stack className="menu">
            <Box>
                <NavLink to={"/"}>
                {!isMobile && <img className="brand-logo" src="/icons/UzChay.png" alt="UzChay Logo"/>}
                {isMobile && <img className="brand-logo-mobile" src="/icons/UzChay.png" alt="UzChay Logo"/>}
                </NavLink>
            </Box>
            {!isMobile ? (
            <Stack className="links">
                <Box className={"hover-line"}>
                <NavLink
                    to={"/"}
                    className={({ isActive }) => (isActive ? "underline" : undefined)}
                >
                    Home
                </NavLink>
                </Box>
                <Box className={"hover-line"}>
                <NavLink
                    to={"/products"}
                    className={({ isActive }) => (isActive ? "underline" : undefined)}
                >
                    Products
                </NavLink>
                </Box>
                {authMember ? (
                <Box className={"hover-line"}>
                    <NavLink
                        to={"/orders"}
                        className={({ isActive }) => (isActive ? "underline" : undefined)}
                    >
                    Orders
                    </NavLink>
                </Box>
                ) : null}
                {authMember ? (
                <Box className={"hover-line"}>
                    <NavLink
                        to={"/member-page"}
                        className={({ isActive }) => (isActive ? "underline" : undefined)}
                    >
                    My Page
                    </NavLink>
                </Box>
                ) : null}
                <Box className={"hover-line"}>
                <NavLink
                    to={"/help"}
                    className={({ isActive }) => (isActive ? "underline" : undefined)}
                >
                    Help
                </NavLink>
                </Box>
                <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
                />
                {!authMember ? (
                <Box>
                    <Button
                    variant="contained"
                    className="login-button"
                    onClick={() => setLoginOpen(true)}
                    >
                    Login
                    </Button>
                </Box>
                ) : (
                <img
                    className="user-avatar"
                    src={
                    authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}?t=${Date.now()}`
                        : "/icons/default-user.svg"
                    }
                    alt="User Avatar"
                    onClick={handleLogoutClick}
                />
                )}
                <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseLogout}
                onClick={handleCloseLogout}
                PaperProps={{
                    elevation: 0,
                    sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                <MenuItem onClick={handleLogoutRequest}>
                    <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "blue" }} />
                    </ListItemIcon>
                    Logout
                </MenuItem>
                </Menu>
            </Stack>
            ) : (
            <>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className="hamburger-menu"
                >
                    <MenuIcon sx={{ color: '#f8f8ff' }} />
                </IconButton>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 280,
                            backgroundColor: '#343434',
                            color: '#f8f8ff'
                        },
                    }}
                >
                    <Box sx={{ padding: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                            <img src="/icons/UzChay.png" alt="UzChay Logo" style={{ width: '120px' }} />
                            <IconButton onClick={handleDrawerToggle} sx={{ color: '#f8f8ff' }}>
                                <Close />
                            </IconButton>
                        </Stack>
                        <Stack spacing={2}>
                            <NavLink to="/" onClick={handleDrawerToggle} className="mobile-nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/products" onClick={handleDrawerToggle} className="mobile-nav-link">
                                Products
                            </NavLink>
                            {authMember && (
                                <NavLink to="/orders" onClick={handleDrawerToggle} className="mobile-nav-link">
                                    Orders
                                </NavLink>
                            )}
                            {authMember && (
                                <NavLink to="/member-page" onClick={handleDrawerToggle} className="mobile-nav-link">
                                    My Page
                                </NavLink>
                            )}
                            <NavLink to="/help" onClick={handleDrawerToggle} className="mobile-nav-link">
                                Help
                            </NavLink>
                            <Box mt={2}>
                                <Basket
                                    cartItems={cartItems}
                                    onAdd={onAdd}
                                    onRemove={onRemove}
                                    onDelete={onDelete}
                                    onDeleteAll={onDeleteAll}
                                />
                            </Box>
                            {!authMember ? (
                                <Button
                                    variant="contained"
                                    className="login-button"
                                    onClick={() => {
                                        setLoginOpen(true);
                                        handleDrawerToggle();
                                    }}
                                    fullWidth
                                >
                                    Login
                                </Button>
                            ) : (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <img
                                        className="user-avatar-mobile"
                                        src={
                                            authMember?.memberImage
                                                ? `${serverApi}/${authMember.memberImage}?t=${Date.now()}`
                                                : "/icons/default-user.svg"
                                        }
                                        alt="User Avatar"
                                        onClick={handleLogoutClick}
                                    />
                                    <Button
                                        onClick={handleLogoutRequest}
                                        sx={{ color: '#f8f8ff' }}
                                    >
                                        Logout
                                    </Button>
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Drawer>
            </>
            )}
            </Stack>
            <Stack className="header-frame">
            <Stack className="detail">
                <Box className={"head-main-txt"}>
                Welcome to our Cousine !!! It is our pleasure to serve you.
                </Box>
                <Box className="wel-txt">The Choice, not just a choice</Box>
                <Box className="service-txt">24 hours service</Box>
                <Box className="signup">
                {!authMember ? (
                    <Button
                    variant={"contained"}
                    className="signup-button"
                    onClick={() => setSignupOpen(true)}
                    >
                    {" "}
                    Sign up 
                    </Button>
                ) : null}
                </Box>
            </Stack >
            <Box className="logo-frame" ml={20}>
                <div className="logo-img"></div>
            </Box>
            </Stack>
        </Container>
    </div>
    );
};
