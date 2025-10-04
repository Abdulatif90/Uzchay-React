import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #343434;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }} >
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <img width={"200px"} src={"/icons/UzChay.png"} alt="UzChay Logo" />
            </Box>
            <Box className={"foot-desc-txt"}>
              Focusing on the UzChay as well as the youth society,
              UzChay aims to bring Uzbek cuisine back. UzChay
              creates an illusion with its cuisine.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} alt="Facebook" />
              <img src={"/icons/twitter.svg"} alt="Twitter" />
              <img src={"/icons/instagram.svg"} alt="Instagram" />
              <img src={"/icons/youtube.svg"} alt="YouTube" />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"} gap={30} >
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Sections</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }} >
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Downtown, Dubai</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+8210 7622 6662</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>Abdulatifsh90@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>Visit 24 hours</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright A.Sharipov, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}