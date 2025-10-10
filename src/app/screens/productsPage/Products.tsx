import { Box, Button, Container, PaginationItem, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { ChangeEvent, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enum/product.enum"
import { serverApi } from "../../../lib/config";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";


/** REDUX SLICE & SELECTOR **/

const productsRetriever = createSelector(retrieveProducts, (products) => ({
    products,
    }));


interface ProductsProps {
  onAdd : (item: CartItem) => void;
}

export default function Products( props: ProductsProps) {
  const {onAdd} = props;
  const dispatch = useDispatch();
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

   useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => dispatch(setProducts(data)))
      .catch((err) => console.log(err));
  }, [productSearch, dispatch])

    useEffect(() => {
    if (searchText === "") {
      setProductSearch(prev => ({ ...prev, search: "" }));
    }
  }, [searchText]);

    /** HANDLERS **/

      const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Stack className="top-title" mt={3}>
              <Box className="top-text" >UzChay Restaurant</Box>
              <Box className="single-search" ml={3}>
                <input 
                  type={"search"}
                  className="single-search-input"
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />

                <Button
                  variant={"contained"}
                  color={"primary"}
                  className="single-button-search"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  search
                </Button>
              </Box>
            </Stack>
          </Stack>
          <Stack className="dishes-filter-section">
            <Button
              variant={"contained"}
              className="order"
              color={
                productSearch.order === "createdAt" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("createdAt")}
            >
              New
            </Button>
            <Button
              variant={"contained"}
              className="order"
              color={
                productSearch.order === "productPrice" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("productPrice")}
            >
              Price
            </Button>
            <Button
              variant={"contained"}
              className="order"
              color={
                productSearch.order === "productViews" ? "primary" : "secondary"
              }
              onClick={() => searchOrderHandler("productViews")}
            >
              Views
            </Button>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="product-category">
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.DISH
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.DISH)}
              >
                Dish
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.SALAD
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
              >
                Salad
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.DRINK
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
              >
                Drink
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.DESSERT
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  searchCollectionHandler(ProductCollection.DESSERT)
                }
              >
                Dessert
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
              >
                Other
              </Button>
            </Stack>
            <Stack className="products-wapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " litre"
                      : product.productSize + " SIZE";
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                    >
                      <Stack
                        className="product-img"
                        sx={{
                          background: `url(${imagePath})`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          });
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="prodct-sale">{sizeVolume}</div>
                        <Button className="shop-btn" onClick={(e) => {
                          e.stopPropagation();
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          })
                        }}> 
                          <img src={"/icons/shopping-cart.svg"} alt="" />
                        </Button>
                        <Button className="view-btn" onClick={(e) => {
                          e.stopPropagation();
                          chooseDishHandler(product._id);
                        }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                          </Stack>
                      <Box className="product-desc" onClick={() => chooseDishHandler(product._id)} style={{ cursor: 'pointer' }}>
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOnIcon color="secondary" />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                     );
                })
              ) : (
                <Box className="no-data">Product are not aviable!</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIos,
                    next: ArrowForwardIos,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <Box className="brand-text">Our Family Brands</Box>
        <Stack className="brand-cards">
          <Box className="brand-card">
            <img src="/img/mealdonor.jpg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/threewomen.jpg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/Uzchaysweetseafood.jpg" alt="" />
          </Box>
        </Stack>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              title="uzchay Restaurant Location"
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101587.62171833022!2d126.88394094999999!3d37.54406899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2c74aeddea1%3A0x8b3046532cc715f6!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2s!4v1696491234567!5m2!1sen!2s"
              height="500px"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
    );
}