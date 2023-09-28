import React, { useContext, useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { useDispatch } from "react-redux";
import Loading from "../layouts/Loading";
import API, { endpoints } from "../configs/API";

const BusinessPage = () => {
  const [user, userDispatch] = useContext(UserContext);
  const [isCollapse, setIsCollapse] = useState(false);
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);

  const handleLogout = () => {
    userDispatch({
      type: "logout",
    });
    navigate("/login");
  };

  useEffect(() => {
    const loadShop = async () => {
      let res = await API.get(endpoints["get-business-shop"](user.id));
      setShop(res.data);
    };
    loadShop();
  }, []);

  if (user === null) return <Loading />;
  if (user.groups[0] !== '1') return "Không có quyền truy cập"
  return (
    <>
      <div className="side-bar-container h-full flex">
        <Sidebar className=" h-screen" backgroundColor="">
          <div className="business-info py-10">
            <div className="avatar flex justify-center">
              <div className="img w-16 h-16 rounded-full overflow-hidden">
                <img src={user.image} className=" object-cover" alt="" />
              </div>
            </div>
            <div
              className={`detail-info ${isCollapse === true ? "hidden" : ""}`}
            >
              <div className="name text-center">
                <span className="font-josefin uppercase">
                  {user.first_name + " " + user.last_name}
                </span>
              </div>
              <div className="email text-center">
                <span className="font-josefin">{user.email}</span>
              </div>
              <div className="status text-center">
                {user.status === "confirmed" ? (
                  <span className="font-josefin text-green">Đã xác nhận</span>
                ) : (
                  <span className="font-josefin text-red">Chờ xác nhận</span>
                )}
              </div>
            </div>
          </div>
          <Menu>
            <SubMenu
              icon={<i class="fa-regular fa-user text-blue-sky text-xl"></i>}
              label="Cá nhân"
            >
              <MenuItem>Thông tin cá nhân</MenuItem>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </SubMenu>
            {shop === null ? (
              <MenuItem
                icon={<i class="fa-solid fa-store text-blue-sky text-xl"></i>}
                {...(user.status === "confirmed"
                  ? { active: true }
                  : { disabled: true })}
                component={<Link to="shop/create"></Link>}
              >
                Tạo cửa hàng
              </MenuItem>
            ) : (
              <SubMenu component={<Link to="/business/shop"></Link>}
                icon={<i class="fa-solid fa-store text-blue-sky text-xl"></i>}
                label="Cửa hàng của tôi"
              >
                <MenuItem className="" component={<Link to="/business/shop"></Link>}>Sản phẩm</MenuItem>
              </SubMenu>
            )}
          </Menu>

          <button
            className="absolute top-0 z-10 right-0 rounded-full border border-black h-10 w-10"
            onClick={() => {
              collapseSidebar();
              setIsCollapse(!isCollapse);
            }}
          >
            x
          </button>
        </Sidebar>
        <main className=" mx-auto w-9/12">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default BusinessPage;
