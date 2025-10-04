import React, {useState} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HelpPage from './screens/helpPage';
import HomePage  from './screens/homePage';
import ProductsPage  from './screens/productsPage';
import OrderPage  from './screens/orderPage';
import  UserPage  from './screens/userPage';
import  HomeNavbar  from './components/headers/HomeNavbar';
import OtherNavbar  from './components/headers/OtherNavbar';
import Footer from './components/footer';
import useBasket from './hooks/useBasket';
import AuthenticationalModal from './components/auth';
import {sweetErrorHandling, sweetTopSuccessAlert} from '../lib/sweetAlert';
import {Messages} from '../lib/config';
import {useGlobals} from './hooks/useGlobals';
import MemberService from './services/MemberService';



// import "../css/app.css
import '../css/navbar.css';
import "../css/footer.css"



function App() {
  const location = useLocation();
  const {  setAuthMember } = useGlobals();
  const {cartItems, onAdd, onRemove, onDelete, onDeleteAll} = useBasket();
  const [signupOpen, setSignupOpen]= useState<boolean>(false);
  const [loginOpen, setLoginOpen]= useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS */
  const handleLoginClose = () => setLoginOpen(false);
  const handleSignupClose = () => setSignupOpen(false);

const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  };
   return (
     <>
     {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      )}
      <Routes>
        <Route path="/help" element={<HelpPage />} />
        <Route path="/products" element={<ProductsPage onAdd={onAdd}/>} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
      <AuthenticationalModal
      signupOpen={signupOpen}
      loginOpen={loginOpen}
      handleLoginClose={handleLoginClose}
      handleSignupClose={handleSignupClose}
      />
    </>
  );
};

export default App;
