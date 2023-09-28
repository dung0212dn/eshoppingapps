import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import cookie from "react-cookies"
import API, { endpoints } from "../../configs/API";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const MainPage = () => {
  const cartDispatch = useDispatch();
  useEffect(() => {
    const loadCartDetail = async () => {
      try {
        const res = await API.get(endpoints["cart-detail"], {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        });

        const total = res.data.reduce(
          (acc, item) =>
            acc +
            item.product.price *
              (1 - item.product.discount / 100) *
              item.quantity,
          0
        );

        cartDispatch({
          type: "SET_CART",
          payload: {
            cartItems: res.data,
            cartTotal: total,
          },
        });

        // console.log(cartItem)
      } catch (error) {}
    };
    loadCartDetail();
  }, []);

  return (
    <>
      <Header></Header>
      <Container>
        <Outlet></Outlet>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default MainPage;
