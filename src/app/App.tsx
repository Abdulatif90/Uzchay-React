import React from 'react';
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
// import "../css/app.css
import '../css/navbar.css';
import "../css/footer.css"



function App() {
  const location = useLocation();
  // Custom hook to manage basket state
  const {cartItems, onAdd, onRemove, onDelete, onDeleteAll} = useBasket();
   return (
     <>
     {location.pathname === "/" ? <HomeNavbar cartItems = {cartItems} 
    onAdd = {onAdd}
    onRemove = {onRemove}
    onDelete = {onDelete}
    onDeleteAll={onDeleteAll} /> 
     : <OtherNavbar cartItems = {cartItems}
    onAdd = {onAdd}
    onRemove = {onRemove}
    onDelete = {onDelete}
    onDeleteAll={onDeleteAll} />} 
      <Routes>
        <Route path="/help" element={<HelpPage />} />
        <Route path="/products" element={<ProductsPage onAdd={onAdd}/>} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
