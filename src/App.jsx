import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import cookie from "react-cookies";
import { useReducer } from "react";
import API, { endpoints } from "./configs/API";

import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import Header from "./layouts/base/Header";
import Footer from "./layouts/base/Footer";
import UserContext from "./Context/UserContext";
import UserReducer from "./Reducer/UserReducer";
import Products from "./views/ProductsPage";
import ProductDetailPage from "./views/ProductDetailPage";
import CartReducer from "./Reducer/CartReducer";
import CartContext from "./Context/CartContext";
import { CartPage } from "./views/CartPage";
import CheckOutPage from "./views/CheckOutPage";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/cartStore";
import RegisterPage from "./views/RegisterPage";
import { useState } from "react";
import { useEffect } from "react";
import BusinessPage from "./views/BusinessPage";
import MainPage from "./layouts/base/MainPage";
import ShopPage from "./components/Dashboard/ShopManage/ShopPage";
import CreateShopPage from "./components/Dashboard/ShopManage/CreateShopPage";
import OrderPage from "./views/OrderPage";
import OrderDetailPage from "./views/OrderDetailPage";
import StatsPage from "./views/StatsPage";
import DashboardView from "./components/Dashboard/DashboardView";
import AddProductView from "./components/Dashboard/ProductManage/AddProductView";

function App() {
  let currentuser = cookie.load("current-user");
  if (currentuser === undefined) currentuser = null;

  const [user, userDispatch] = useReducer(UserReducer, currentuser);

  return (
    <>
      <UserContext.Provider value={[user, userDispatch]}>
        <Provider store={store}>
          {/* <CartContext.Provider value={[cart, cartDispatch]}> */}
          <BrowserRouter>
            <Container>
              <Routes>
                <Route path="/" element={<MainPage />}>
                  <Route path="" element={<HomePage />}/>
                  <Route path="login" element={<LoginPage />}/>
                  <Route path="products" element={<Products />}/>
                  <Route
                    path="products/:productId"
                    element={<ProductDetailPage />}
                  />
                  <Route path="cart" element={<CartPage />}/>
                  <Route path="cart/check-out" element={<CheckOutPage />}/>
                  <Route path="register" element={<RegisterPage />}/>
                  <Route path="order" element={<OrderPage />}/>
                  <Route path="order/:orderId" element={<OrderDetailPage />}/>
                  
                </Route>
                <Route path="/business/" element={<BusinessPage />}>
                  <Route path="shop" element={<ShopPage/>}/>
                  <Route path="shop/create" element={<CreateShopPage/>}></Route>
                  <Route path="product/create" element={<AddProductView/>}></Route>
                </Route>
                <Route path="stats/" element={<StatsPage />}>
                  <Route path="dashboard" element={<DashboardView />}/>
                </Route>
              </Routes>
            </Container>

           
          </BrowserRouter>
          {/* </CartContext.Provider> */}
        </Provider>
      </UserContext.Provider>
    </>
  )
}

export default App;
