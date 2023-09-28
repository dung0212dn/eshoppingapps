import React from "react";
import HeaderTopBar from "./HeaderTopBar";
import SearchBar from "../forms/SearchBar";
import Navigation from "../base/Navigation";
import { CategoriesContext } from "../../views/HomePage";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../Context/CartContext";
import UserContext from "../../Context/UserContext";
import { useEffect, useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookie from "react-cookies"
import API, { endpoints } from "../../configs/API";

const Header = () => {
  //  const [cart, cartDispatch] = useContext(CartContext)
  const [user, userDispatch] = useContext(UserContext);
  //  const [cartCount, setCartCount] = useState(null)
  const cartCount = useSelector((state) => state.cartCount);
 

  return (
    <>
      <div className="header-topbar">
        <HeaderTopBar />
      </div>
      <div className="header-container pt-8 pb-2 shadow-xl">
        <div className="header-inner flex h-10 mx-auto w-11/12">
          <div className="header-inner__left w-1/4 flex items-center justify-start">
            <div class="header-logo">
              <span class="font-greatvibes text-5xl"> Last Twiglight</span>
            </div>
          </div>
          <div className="header-center w-2/4 flex items-center justify-start">
            <SearchBar></SearchBar>
          </div>
          <div className="header-inner__left w-1/4 flex items-center justify-end px-20 gap-x-12">
            <div className="header-cart hover:text-bronze p-3 flex items-center justify-end rounded-full relative">
              <Link to="/cart">
                <i className="fa-solid fa-bag-shopping text-2xl p-1"></i>
                <span className="count bg-bronze text-white rounded-full w-6 h-6 text-center font-opensans text-sm absolute top-1 right-0">
                  {user === null ? 0 : cartCount}
                </span>
              </Link>
            </div>
            <div className="header-account hover:text-bronze">
              {user === null ? (
                <button className="account-link">
                  <div className="icon-user">
                    <i className="fa-regular fa-user text-2xl"></i>
                  </div>
                </button>
              ) : (
                <div className="avatar-user w-8 h-8 rounded-full overflow-hidden ">
                  <img className="" src={user.image} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>

        <Navigation></Navigation>
      </div>
    </>
  );
};

export default memo(Header);
