import React, { useEffect, useState } from "react";
import { Button, Form, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Categories from "../../components/Categories/Categories";
import API, { endpoints } from "../../configs/API";
import "../../assets/css/Naviga.css";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";
import cookie from "react-cookies";
import "../../assets/css/Naviga.css";
import { useDispatch } from "react-redux";

const categories = [
  {
    name: "Trang chủ",
    link: "/",
    submenu: "",
  },
  { name: "Sản phẩm", link: "/products", submenu: "" },
  { name: "Về chúng tôi", link: "/", submenu: "" },
  { name: "Liên hệ", link: "/", submenu: "" },
];

const linkCategories = categories.map((item, index) => (
  <li
    className="nav-menu-item font-opensans static font-thin cursor-pointer tracking-wide py-4"
    key={index}
  >
    <Link className=" hover:text-bronze" to={item.link}>
      {item.name}
    </Link>
  </li>
));

const Navigation = () => {
  const [isShow, setIsShow] = useState(false);
  const [isShowMenuUser, setIsShowMenuUser] = useState(false);
  const [user, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const cartDispatch = useDispatch()
  const showCategoriesToggle = () => {
    setIsShow(!isShow);
  };

  const showMenuUserToggle = () => {
    setIsShowMenuUser(!isShowMenuUser);
  };
  const handleLogout = () => {
    cartDispatch({
      type: "SET_CART",
      payload: {
        cartItems: [],
        cartTotal: null,
      },
    });
    dispatch({
      type: "logout",
    });
    navigate("/login");
  };

  return (
    <>
      <div className="nav-container mx-auto w-11/12 pt-8">
        <div className="nav-wrap relative w-full flex">
          <div className="nav-left w-2/5 relative">
            <div
              className=" bg-gray-light w-1/2 h-full rounded text-left px-4 flex"
              onClick={showCategoriesToggle}
            >
              <span className="w-3/4 font-josefin flex justify-start items-center h-full uppercase">
                Danh mục sản phẩm
              </span>
              <span className="flex w-1/4 justify-end items-center h-full">
                <i class="fa-solid fa-caret-down ml-12"></i>
              </span>
            </div>
            <div className={`category absolute w-3/6 ${isShow ? "show" : ""}`}>
              <Categories></Categories>
            </div>
          </div>

          <div className="nav-right flex justify-end w-3/5">
            <ul className="nav-menu flex justify-end items-center gap-x-12">
              {linkCategories}
              {user === null ? (
                <>
                  <li className="nav-menu-item font-opensans static font-thin cursor-pointer tracking-wide py-4">
                    <Link className=" hover:text-bronze" to="/login">
                      Đăng nhập
                    </Link>
                    <span className="text-xl">/</span>
                    <Link className=" hover:text-bronze pl-1" to="/register">
                      Đăng kí
                    </Link>
                  </li>
                  <li className="nav-menu-item font-opensans static font-thin cursor-pointer tracking-wide py-4"></li>
                </>
              ) : (
                <>
                  <li className="nav-menu-item font-opensans font-thin cursor-pointer tracking-wide py-4 relative">
                    {/* <button onClick={handleLogout}>Đăng xuất</button> */}

                    <button
                      className="flex  hover:text-bronze"
                      onClick={showMenuUserToggle}
                    
                    >
                      <span className="pr-2">Xin chào, {user.first_name}</span>
                    

                      <span className="px-2">
                        <i class="fa-solid fa-caret-down"></i>
                      </span>
                    </button>
                    <div
                      className={`menu-user right-0 top-full absolute ${
                        isShowMenuUser ? "show" : ""
                      }`}
                    >
                      <ul className=" border  border-gray-light w-60 bg-white z-30 shadow-xl">
                        <li className="py-2 hover:bg-dark-orange hover:text-white my-1 px-2">
                          Thông tin cá nhân
                        </li>
                        <li className="py-2 hover:bg-dark-orange hover:text-white my-1 px-2">
                          <Link className="block" to="/order" >Đơn hàng của tôi</Link>
                        </li>
                        <li className="py-2 hover:bg-dark-orange hover:text-white my-1 px-2">
                          Đổi mật khẩu
                        </li>
                        <li className="py-2 hover:bg-dark-orange hover:text-white my-1 px-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left"
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
