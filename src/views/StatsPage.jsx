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

const StatsPage = () => {
  const [user, userDispatch] = useContext(UserContext);
  const [isCollapse, setIsCollapse] = useState(false);
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    userDispatch({
      type: "logout",
    });
    navigate("/login");
  };


  if (user === null) return <Loading />;
  if (user.groups[0] !== 0) return "Không có quyền truy cập!"
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
        <main className=" mx-auto w-10/12 py-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default StatsPage;
