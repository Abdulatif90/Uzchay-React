import React , {useState} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HelpPage from './screens/helpPage';
import HomePage  from './screens/homePage';
import ProductsPage  from './screens/productsPage';
import OrderPage  from './screens/orderPage';
import  UserPage  from './screens/userPage';
import  HomeNavbar  from './components/headers/HomeNavbar';
import OtherNavbar  from './components/headers/OtherNavbar';
import Footer from './components/footer';
import { CartItem } from '../lib/types/search';
// import "../css/app.css
import '../css/navbar.css';
import "../css/footer.css"



function App() {
  const location = useLocation(),
   cartJson: string | null = localStorage.getItem("cartData"),
   currentCart = cartJson ? JSON.parse(cartJson) : [],
   [cartItems, setCartitems] = useState<CartItem[]>(currentCart);

  // HANDLERS
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(( item: CartItem) => item._id === input._id);
    if(exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>{
        return item._id === input._id ?
        {...exist, quantity: exist.quantity + 1}
        : item;
      });
      setCartitems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else{
      const cartUpdate = [...cartItems, {...input}];
      setCartitems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };
   return (
     <>
     {location.pathname === "/" ? <HomeNavbar cartItems = {cartItems} /> : <OtherNavbar cartItems = {cartItems}/>} 
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
