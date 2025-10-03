import React from "react";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useEffect } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Button, Container, Divider, Rating, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { setRestaurant, setChosenProduct } from "./slice";
import { Product } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveRestaurant, retrieveChosenProduct } from "./selector";
import {Member} from "../../../lib/types/member";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MemberService from "../../services/MemberService"
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";


/** REDUX SLICE & SELECTOR **/

const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({
    restaurant,
  })
);

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props : ChosenProductProps) {
  const {onAdd} = props;
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const { restaurant } = useSelector(restaurantRetriever);
  const { chosenProduct } = useSelector(chosenProductRetriever);

  useEffect(() => {
    if (productId) {
      const product = new ProductService();
      product
        .getProduct(productId)
        .then((data: Product) => dispatch(setChosenProduct(data)))
        .catch((err: unknown) => console.log(err));
    }

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data: Member) => dispatch(setRestaurant(data)))
      .catch((err: unknown) => console.log(err));
  }, [productId, dispatch]);

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {chosenProduct?.productName}
            </strong>
            <span className={"resto-name"}>{restaurant?.memberNick}</span>
            <span className={"resto-name"}>{restaurant?.memberPhone}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                   <span>{chosenProduct?.productViews}</span>
                </div>
              </div>
            </Box>
             <p className={"product-desc"}>
              {chosenProduct?.productDesc
                ? chosenProduct?.productDesc
                : "No Description"}
            </p>
            <Divider sx={{ height: "1px", width: "100%", bgcolor: "#000000" }} />
            <div className={"product-price"}>
              <span>Price:</span>
             <span>${chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                    onAdd({
                      _id: chosenProduct._id as string,
                      name: chosenProduct.productName,
                      image: chosenProduct.productImages?.[0] || "",
                      price: chosenProduct.productPrice,
                      quantity: 1,
                    });
                    e.stopPropagation();
                  }
                }>
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}