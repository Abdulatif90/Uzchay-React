import { Route, Routes } from "react-router-dom";
import Products from "./Products";
import ChosenProducts from "./ChosenProducts";

export default function ProductsPage() {
  return (
    <div className="products-page">
      <Routes>
        <Route path=":productId" element={<ChosenProducts />} />
        <Route path="" element={<Products />} />
      </Routes>
    </div>
  );
}