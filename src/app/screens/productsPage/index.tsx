import { Route, Routes, RouteMatch } from "react-router-dom";
import Products from "./Products";
import ChosenProducts from "./ChosenProducts";
import {CartItem} from "../../../lib/types/search";
import "../../../css/products.css"
import { useMatch } from "react-router-dom";

interface ProductPageProps {
  onAdd: (item: CartItem) => void
}
 export default function ProductsPage( props: ProductPageProps) {
  const {onAdd} = props;
  const products = useRouteMatch();
  return (
    <div className="products-page">
      <Routes>
        <Route path={`${products.path}/:productId`} element={<ChosenProducts onAdd={onAdd} />} />
        <Route path={`${products.path}`} element={<Products onAdd={onAdd} />} />
      </Routes>
    </div>
  );
}
function useRouteMatch() {
  const match = useMatch("");
  // Fallback to root path if match is null
  return {
    path: match?.pathnameBase || "",
    url: match?.pathname || "",
    params: match?.params || {},
  };
}
