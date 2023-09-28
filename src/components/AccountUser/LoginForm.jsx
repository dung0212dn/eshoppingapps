import React, { useEffect, useState } from "react";
import "./styles/FormLogin.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import API, { endpoints } from "../../configs/API";
import queryString from "query-string";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../layouts/Loading";
import { ClipLoader, DotLoader, FadeLoader, PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [totalMoney, setTotalMoney] = useState(null);
  const cartItems = useSelector((state) => state.cartItems);
  const cartDispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cartTotal);
  const [cartItem, setCartItem] = useState([]);

  const client_id = "8pEOP0A7AWphcHf3R9UwYTBTsY6SysEWLE9rGSza";
  const client_secret =
    "40pDM88HP0rPTFZfrFiIPi0EWScJL5uOSK0zp6KPzUXB6q2fm2vCWYdS7HYXoP0AcpH4C8bdpxaokCj49Kq88OQMbL65ENf1IXJvmAOCVUyjyr8NGy3m3abWJGbHIqbN";
  const grant_type = "password";

  const data = {
    username: username,
    password: password,
    client_id: client_id,
    client_secret: client_secret,
    grant_type: "password",
  };

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    const process = async () => {
      setLoading(true);
      try {
        let res = await API.post(
          endpoints["login"],
          queryString.stringify(data)
        ).catch((error) => {
          if (error.response.status === 400) {
            toast.error("Sai tên đăng nhập hoặc mật khẩu!");
          } else if (error) {
            toast.error(
              "Có lỗi xảy ra trong quá trình đăng nhập! Vui lòng thử lại sau!"
            );
          }
        });
        cookie.save("access_token", res.data.access_token);

        const loadCartDetail = async () => {
          try {
            const res = await API.get(endpoints["cart-detail"], {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookie.load("access_token")}`,
              },
            });

            setCartItem(res.data);

            const total = res.data.reduce(
              (acc, item) =>
                acc +
                item.product.price *
                  (1 - item.product.discount / 100) *
                  item.quantity,
              0
            );

            setTotalMoney(total);
            cartDispatch({
              type: "SET_CART",
              payload: {
                cartItems: res.data,
                cartTotal: totalMoney,
              },
            });

            // console.log(cartItem)
          } catch (error) {}
        };
        loadCartDetail();

        let user = await API.get(endpoints["current-user"], {
          headers: {
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        });
       
        if (user.data.groups[0] === 1) {
          let business = await API.get(endpoints["current-business"], {
            headers: {
              Authorization: `Bearer ${cookie.load("access_token")}`,
            },
          });
          console.log(business)
          cookie.save("current-user", business.data);

          dispatch({
            type: "login",
            payload: business.data,
          });
        } else {
          cookie.save("current-user", user.data);

          dispatch({
            type: "login",
            payload: user.data,
          });
        }

        if (user.data.groups[0] === 1) navigate("/business");
        else if (user.data.groups[0] === 4) navigate("/stats");
        else navigate("/");
      } catch (ex) {
      } finally {
        setLoading(false);
      }
    };

    process();
  };

  return (
    <>
      <div className="login-form-container mx-auto border border-gray-light-thin h-124 w-full">
        <div className="login-form-wrapper p-12 w-full h-full">
          <div className="login-form-inner border relative border-gray-light-thin h-full w-full">
            <div className="login-form__title absolute w-full flex justify-center top-0">
              <h3 className="bg-white font-garamond font-medium z-10 px-5 py-2 text-center text-2xl form-title">
                Đăng nhập
              </h3>
            </div>
            <div className="login-form__content py-10">
              <form
                onSubmit={handleSubmit}
                action=""
                className="w-full px-12 py-4"
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="login-form__input input-username border"
                    placeholder="Email..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group relative">
                  <input
                    type="password"
                    className="login-form__input input-password border"
                    placeholder="Mật khẩu..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" className="show-password px-2">
                    <i className="fa-regular fa-eye hidden"></i>
                    <i className="fa-regular fa-eye-slash"></i>
                  </button>
                </div>
                <div className="form-link">
                  <Link to="/" className="forgot-password__link">
                    <span className="text-base font-garamond relative">
                      Quên mật khẩu?
                    </span>
                  </Link>
                </div>
                <div className="form-button">
                  <button
                    type="submit"
                    className="login-button font-garamond bg-bronze font-semibold text-white px-16"
                  >
                    {loading === true ? (
                      <PulseLoader color="white" size={10} />
                    ) : (
                      "Đăng nhập"
                    )}
                  </button>
                </div>
              </form>
              <div className="create-accout px-12 w-full">
                <Link
                  to="/register"
                  className="create-account__link border font-garamond font-semibold text-bronze uppercase"
                >
                  <span className="relative">Đăng kí tài khoản mới</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default LoginForm;
