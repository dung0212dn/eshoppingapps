import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import UserContext from "../Context/UserContext";
import API, { endpoints } from "../configs/API";
import cookie from "react-cookies";
import { formattedNumber } from "../configs/Methods";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CartContext from "../Context/CartContext";
import PageTitle from "../layouts/Section/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../layouts/Loading";

export const CartPage = () => {
  const [user, dispatch] = useContext(UserContext);
  const [cartItem, setCartItem] = useState([]);
  // const [cart, cartDispatch] = useContext(CartContext);
  const [productQuantity, setProductQuantity] = useState(1);
  const [totalMoney, setTotalMoney] = useState(null);
  const cartItems = useSelector((state) => state.cartItems);
  const cartDispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cartTotal);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    cartDispatch({
      type: "SET_CART",
      payload: {
        cartItems: cartItems,
        cartTotal: totalMoney,
      },
    });
  }, [cartItem, totalMoney]);

  const handleIncreseProduct = (e) => {
    const cartItem2 = JSON.parse(e.target.dataset.cart);
    const updateCartItem = cartItems.map((detail) => {
      if (detail.id === cartItem2.id) {
        return {
          ...detail,
          quantity: detail.quantity + 1,
        };
      } else return detail;
    });

    // setCartItem(updateCartItem);
    //     setTotalMoney(updateCartItem.reduce((accumulator, currentValue) => accumulator + (currentValue.product.price * (1 - currentValue.discount /100)) * currentValue.quantity,
    //     0))

    const total = updateCartItem.reduce(
      (acc, item) =>
        acc +
        item.product.price * (1 - item.product.discount / 100) * item.quantity,
      0
    );
    setTotalMoney(total);

    const updateCart = async (cartItem2) => {
      try {
        const res = API.patch(endpoints["update-cart-detail"](cartItem2.id), {
          quantity: cartItem2.quantity + 1,
        });
      } catch (e) {}
    };

    updateCart(cartItem2);

    cartDispatch({
      type: "SET_CART",
      payload: {
        cartItems: updateCartItem,
        cartTotal: total,
      },
    });
  };

  const handleDecreseProduct = (e) => {
    const cartItem2 = JSON.parse(e.target.dataset.cart);
    if (cartItem2.quantity > 1) {
      const updateCartItem = cartItems.map((detail) => {
        if (detail.id === cartItem2.id) {
          return {
            ...detail,
            quantity: detail.quantity - 1,
          };
        } else return detail;
      });

      const total = updateCartItem.reduce(
        (acc, item) =>
          acc +
          item.product.price *
            (1 - item.product.discount / 100) *
            item.quantity,
        0
      );
      setTotalMoney(total)

      cartDispatch({
        type: "SET_CART",
        payload: {
          cartItems: updateCartItem,
          cartTotal: total,
        },
      });

      const updateCart = async (cartItem2) => {
        try {
          const res = API.patch(endpoints["update-cart-detail"](cartItem2.id), {
            quantity: cartItem2.quantity + 1,
          });
        } catch (e) {}
      };

      updateCart(cartItem2);
    } else {
      toast.warning("Số lượng không thể nhỏ hơn 1");
    }
  };

  const handleCheckOut = () => {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
    localStorage.setItem("total", cartTotal);
    cartDispatch({
      type: "CHECK_OUT",
    });
  };

  const handleDelete = () => {
    const itemDelete = document.getElementById("cartId").value;

    const deleteCart = async (idCart) => {
      try {
        const res = await toast.promise(
          API.delete(endpoints["delete-cart"](idCart), {
            headers: {
              Authorization: `Bearer ${cookie.load("access_token")}`,
            },
          }),
          {
            success: "Xoá sản phẩm thành công",
          }
        );
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
    
      } catch (error) {
        if (error.response) {
          // Request đã được gửi và server đã trả về status code không phù hợp
          toast.error(error.response.data.message);
        }
      }
    };

    deleteCart(itemDelete);
    
    
  };

  if (cartItems === []) return <Loading/>;
  if (cartItems.length === 0)
    return (
      <>
        <PageTitle title="Giỏ hàng" />
        <Container>
          <div className="cart-container">
            <div className="cart-wrapper mx-auto w-10/12">
              <div className="cart-announce  h-16 flex justifi-center items-center">
                <span className="uppercase text-2xl text-heavy-red text-center font-josefin w-full">
              
                  Không có sản phẩm trong giỏ hàng
                </span>
              </div>
            </div>
            <div className="cart-footer mx-auto w-10/12 py-12">
              <div className="total-price w-full flex justify-end">
                <div className="cart-footer-left w-1/2 flex justify-start">
                  <Link
                    to="/products"
                    className="shopping border flex justify-center items-center font-semibold hover:bg-black hover:text-white py-4 px-8 font-josefin uppercase"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
                <div className="cart-footer-right w-1/2 flex justify-end">
                  <div className="footer-wrapper">
                    <div className="cart-total">
                      <span className=" font-josefin font-semibold pr-2">
                        Tổng cộng:
                      </span>
                      <span className="pl-2 font-josefin text-heavy-red text-xl">
                        {formattedNumber(totalMoney)} VNĐ
                      </span>
                    </div>
                    {(user, cartItem.length !== 0) ? (
                      <div className="check-out w-full">
                        <Link
                          onClick={handleCheckOut}
                          className="block text-center py-2 font-josefin text-white hover:bg-red bg-heavy-red"
                          to="/cart/check-out"
                        >
                          Thanh toán
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    );

  return (
    <>
      <PageTitle title="Giỏ hàng" />
      <Container>
        <div className="cart-container">
          <div className="cart-wrapper mx-auto w-10/12">
            <table className="cart-list w-full">
              <thead>
                <tr className="border-b-2 uppercase  border-gray-light">
                  <th colSpan={2} className="font-josefin text-left py-6">
                    Sản phẩm
                  </th>
                  <th colSpan={1} className="font-josefin text-center">
                    Giá
                  </th>
                  <th colSpan={1} className="font-josefin text-center">
                    Số lượng
                  </th>
                  <th></th>
                  <th colSpan={1} className="font-josefin text-right">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className="h-52 px-6 py-2 border-b-2 border-gray-dark"
                  >
                    <td className="cart-item__picture w-32">
                      <img
                        src={item.product.thumbnail}
                        className=" object-cover"
                        alt=""
                      />
                    </td>
                    <td className="cart-item__detail">
                      <div className="info flex flex-col gap-y-3 pl-4 text-sm">
                        <span className="text-gray-dark">
                          {item.product.name}
                        </span>
                        <span className="text-gray-dark">
                          Size: {item.sizes.name}
                        </span>
                        <span className="text-gray-dark">
                          Màu: {item.colors.name}
                        </span>
                      </div>
                    </td>
                    <td className="cart-item__price text-center text-xl font-josefin text-red">
                      {formattedNumber(
                        item.product.price * (1 - item.product.discount / 100)
                      )}
                      <span className="pl-1 text-xl font-josefin text-red">
                        VNĐ
                      </span>
                    </td>
                    <td className="cart-item__quantity text-center">
                      <div className="button-quantity-form flex items-center h-full w-full border-none justify-center ">
                        <div className="wrapper  border-2 border-gray-light h-12">
                          <button
                            data-cart={JSON.stringify({
                              id: item.id,
                              quantity: item.quantity,
                            })}
                            onClick={handleDecreseProduct}
                            className="justify-start h-full w-12 hover:bg-dark-orange hover:text-white"
                          >
                            <i class="fa-solid fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className=" font-josefin text-xl text-center w-12 outline-none"
                            value={item.quantity}
                            onChange={() => ""}
                          />
                          <input
                            type="hidden"
                            name="cartID"
                            value={item.id}
                            id="cartId"
                          />
                          <button
                            data-cart={JSON.stringify({
                              id: item.id,
                              quantity: item.quantity,
                            })}
                            onClick={handleIncreseProduct}
                            className="justify-end h-full w-12 hover:bg-dark-orange hover:text-white"
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={handleDelete}
                        data-id={item.id}
                        className="h-12 w-12 hover:text-dark-orange"
                      >
                        <i class="fa-solid fa-trash-can text-right"></i>
                      </button>
                    </td>
                    <td className="cart-item__total text-right text-xl font-josefin text-red">
                      {formattedNumber(
                        item.quantity *
                          item.product.price *
                          (1 - item.product.discount / 100)
                      )}
                      <span className="pl-1 text-xl font-josefin text-red">
                        VNĐ
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cart-footer mx-auto w-10/12 py-12">
            <div className="total-price w-full flex justify-end">
              <div className="cart-footer-left w-1/2 flex justify-start">
                <Link
                  to="/products"
                  className="shopping border flex justify-center items-center font-semibold hover:bg-black hover:text-white py-4 px-8 font-josefin uppercase"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
              <div className="cart-footer-right w-1/2 flex justify-end">
                <div className="footer-wrapper">
                  <div className="cart-total">
                    <span className=" font-josefin font-semibold pr-2">
                      Tổng cộng:
                    </span>
                    <span className="pl-2 font-josefin text-heavy-red text-xl">
                      {formattedNumber(totalMoney)} VNĐ
                    </span>
                  </div>
                  {user ? (
                    <div className="check-out w-full">
                      <Link
                        onClick={handleCheckOut}
                        className="block text-center py-2 font-josefin text-white hover:bg-red bg-heavy-red"
                        to="/cart/check-out"
                      >
                        Thanh toán
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};
