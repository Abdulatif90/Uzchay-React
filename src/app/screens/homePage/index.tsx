import React, { useEffect } from "react";
import Statistics from "./Statistics";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import PopularDishes from "./PopularDishes";
import { useDispatch} from "react-redux";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enum/product.enum";
import MemberService from "../../services/MemberService";
import {Member} from "../../../lib/types/member";
import "../../../css/home.css";



/** REDUX SLICE & SELECTOR **/

 export default function HomePage() {
 const dispatch = useDispatch();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then((data: Product[]) => {
        dispatch(setPopularDishes(data));
      })
      .catch((err: unknown) => console.log(err));

      product
      .getProducts({
        page: 1,
        limit: 4,
        order: "updatedAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        dispatch(setNewDishes(data));
      })
      .catch((err) => console.log(err));
      const member = new MemberService();
      member.getTopUsers().then((data: Member[]) => {
        dispatch(setTopUsers(data));
      })
      .catch((err: unknown) => console.log(err))
  }, [dispatch]);
    return (
    <div className="homepage">
      <Statistics/>
      <PopularDishes/>
      <NewDishes/>
      <Advertisement/>
      <ActiveUsers/>
      <Events/>
    </div>  
  );
}
  