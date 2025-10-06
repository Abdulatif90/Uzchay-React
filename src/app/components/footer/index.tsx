import React from "react";
import { Box, Container, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: #343434;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Footers>
      <Container>
        <Stack 
          flexDirection={isMobile ? "column" : "row"} 
          sx={{ mt: isMobile ? "40px" : "94px" }}
          spacing={isMobile ? 4 : 0}
        >
          <Stack flexDirection={"column"} style={{ width: isMobile ? "100%" : "340px" }}>
            <Box textAlign={isMobile ? "center" : "left"}>
              <img 
                width={isMobile ? "150px" : "200px"} 
                src={"/icons/UzChay.png"} 
                alt="UzChay Logo" 
              />
            </Box>
            <Box 
              className={"foot-desc-txt"} 
              textAlign={isMobile ? "center" : "left"}
              px={isMobile ? 2 : 0}
            >
              Focusing on the UzChay as well as the youth society,
              UzChay aims to bring Uzbek cuisine back. UzChay
              creates an illusion with its cuisine.
            </Box>
            <Box 
              className="sns-context" gap={2}
              justifyContent={isMobile ? "center" : "flex-start"}
              display="flex"
            >
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <img src={"/icons/facebook.svg"} className="sns-icon" alt="Facebook"
                 />
              </a>
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <img src={"/icons/twitter.svg"} className="sns-icon" alt="Twitter"
                />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <img src={"/icons/instagram.svg"} className="sns-icon" alt="Instagram"
                />
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
                <img src={"/icons/youtube.svg"}  className="sns-icon" alt="YouTube" 
                />
              </a>
            </Box>
          </Stack>
          <Stack 
            sx={{ 
              ml: isMobile ? 0 : "288px",
              mt: isMobile ? 0 : 5,
              gap: isMobile ? 2 : 30
            }} 
            flexDirection={"row"}
            alignItems={isMobile ? "flex-start" : "flex-start"}
            justifyContent={isMobile ? "space-between" : "flex-start"}
          > 
            <Stack textAlign={isMobile ? "left" : "left"} flex={isMobile ? 1 : 0}>
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
            <Stack 
              sx={{ ml: isMobile ? 0 : "100px" }}
              textAlign={isMobile ? "left" : "left"}
              flex={isMobile ? 1 : 0}
            >
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
                    <div>Seoul, S.Korea</div>
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
          sx={{ mt: isMobile ? "40px" : "80px" }}
        ></Stack>
        <Stack 
          className={"copyright-txt"} 
          textAlign={isMobile ? "center" : "left"}
          sx={{ pb: isMobile ? 2 : 0 }}
        >
          © Copyright A.Sharipov, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
