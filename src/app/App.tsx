import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage  from './screens/homePage';
import ProductsPage  from './screens/productsPage';
import OrderPage  from './screens/orderPage';
import  UserPage  from './screens/userPage';
import  HomeNavbar  from './components/headers/HomeNavbar';
import OtherNavbar  from './components/headers/OtherNavbar';
import Footer from './components/footer';
// import "../css/app.css
import '../css/navbar.css';
import "../css/footer.css"


function App() {
  const location = useLocation();
  console.log(location)
   return (
     <>
    {location.pathname === "/" ? <HomeNavbar/> : <OtherNavbar/>}
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}



export default App;
