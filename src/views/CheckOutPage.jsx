import React, { useState } from "react";
import {
  Container,
  FloatingLabel,
  Form,
  FormCheck,
  FormGroup,
} from "react-bootstrap";
import PageTitle from "../layouts/Section/PageTitle";
import { useContext } from "react";
import UserContext from "../Context/UserContext";
import cookie from "react-cookies";

import axios from "axios";
import { useEffect } from "react";
import CartContext from "../Context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { formattedNumber } from "../configs/Methods";
import PayPal from "../layouts/PayPal";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import API, { authAPI, endpoints } from "../configs/API";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const [user, userDispatch] = useContext(UserContext);
  const cartDispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const storedCartData = localStorage.getItem("cartData");
  const cartData = storedCartData
    ? Object.values(JSON.parse(storedCartData))
    : [];

  const totalRecent = localStorage.getItem("total");
  const [totalCost, setTotalCost] = useState(totalRecent);
  const [shippingMoney, setShippingMoney] = useState(0);
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [paymentStatus, setPaymentStatus] = useState("FAIL");
  const [order, setOrder] = useState({
    name: null,
    phone: null,
    email: null,
    orderShipping: null,
    orderDetail: null,
  });
  const [addressShipping, setAddressShipping] = useState({
    address: "",
    ward: "",
    district: "",
    city: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [err, setErr] = useState();


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
  
  const handleShippingCost = (e) => {
    const shippingCost = e.target.value;
    if (e.target.checked) {
      setShippingMoney(shippingMoney - shippingMoney + parseInt(shippingCost));
      setTotalCost(parseInt(totalRecent) + parseInt(shippingCost));
    } else {
      setTotalCost(parseInt(totalRecent) - parseInt(shippingCost));
      setShippingMoney(shippingMoney - shippingMoney + parseInt(shippingCost));
    }
  };

  const handlePaymentMethodSelected = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDeteleCart = async (cartDetailId) => {
    try {
      const response = await API.delete(
        endpoints["delete-cart"](cartDetailId),
        {
          headers: {
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async (productId, quantity) => {
    console.log(quantity)
    try {
      const product =  await API.get(endpoints['product-detail'](productId))
      const form = new FormData()
      const quantityUpdate = product.data.quantity - quantity
      form.append("quantity", quantityUpdate)
      const response = await API.patch(
        endpoints["update-product"](productId),
        form,
        {
          headers: {
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const orderDetail = cartData.map((item) => ({
    product: item.product.id,
    price: item.product.price,
    discount: item.product.discount,
    sizes: item.sizes.id,
    colors: item.colors.id,
    quantity: item.quantity,
    order: orderId,
  }));
  // console.log(JSON.stringify(dataa.order_details));

  const handleCheckOut = () => {
    if (
      order.name === null ||
      order.phone === null ||
      addressShipping.address === null ||
      addressShipping.ward === null ||
      addressShipping.district === null ||
      addressShipping.city === null ||
      order.orderShipping === null
    ) {
      toast.warning("Vui lòng điền đầy đủ thông tin");
    } else {
      const checkOut = async () => {
        const dataCheckOut = JSON.stringify({
          name: order.name,
          phone: order.phone,
          email: user.email,
          address:
            addressShipping.address +
            ", " +
            addressShipping.ward +
            ", " +
            addressShipping.district +
            ", " +
            addressShipping.city,
          total_amount: totalCost,
          status_ship: order.orderShipping,
          order_details: orderDetail,
          payment_method: paymentMethod,
          payment_status: paymentStatus
        });
        console.log(dataCheckOut)
        try {
          const res = await toast
            .promise(
              API.post(
                endpoints["order"],
                dataCheckOut,
                // formData,
                {
                  headers: {
                    Authorization: `Bearer ${cookie.load("access_token")}`,
                    "Content-Type": "application/json",
                  },
                }
              ),
              {
                pending: "Đang xử lý yêu cầu đặt hàng",
                success: "Đặt hàng thành công.",
              }
            )
           
          cartData.forEach((item) => {
            handleDeteleCart(item.id);
          });

          orderDetail.forEach((item) => {
            handleUpdateProduct(item.product, item.quantity)
          });

          cartDispatch({
            type: "SET_CART",
            payload: {
              cartItems: [],
              cartTotal: null
            },
          });

          setTimeout(() => navigate("/order"), 3000)
          
        } catch (error) {
          if (error.response) {
            // Request đã được gửi và server đã trả về status code không phù hợp
            toast.error(error.response.data.message);
          }
        }
      };
      checkOut();
    }
  };

  if (storedCartData === null) return "Đang tải...";
  return (
    <>
      <PageTitle title="Thanh toán"></PageTitle>
      <Container>
        <div className="checkout-container pb-16">
          <div className="checkout-wrapper mx-auto w-10/12">
            <div className="checkout-content flex gap-x-14">
              <div className="checkout-col-left w-1/2">
                <div className="contact-info pb-2">
                  <div className="heading-title text-2xl pb-4 font-semibold">
                    Thông tin liên hệ
                  </div>
                  <div className="contact-content">
                    <div className="contact-name py-1">
                      {user.first_name + " " + user.last_name}
                    </div>
                    <div className="contact-email">({user.email})</div>
                    <Form className="flex gap-x-3 py-6">
                      <Form.Check></Form.Check>
                      <Form.Label>
                        Gửi thông tin mới và ưu đãi cho tôi
                      </Form.Label>
                    </Form>
                  </div>
                </div>
                <div className="shipping-info pb-8">
                  <div className="heading-title text-2xl pb-4 font-semibold">
                    Thông tin giao hàng
                  </div>
                  <div className="shipping-content">
                    <Form className="flex flex-col gap-y-4">
                      <div className="row-1 flex gap-x-6">
                        <div className="col w-full">
                          <FormGroup>
                            <Form.Label className="text-sm">
                              Họ và Tên
                            </Form.Label>
                            <Form.Control
                              className="block w-full border outline-none px-2 h-12 rounded text-sm"
                              placeholder="Họ và Tên"
                              value={order.name}
                              onChange={(e) => {
                                setOrder((curr) => ({
                                  ...curr,
                                  name: e.target.value,
                                }));
                              }}
                            ></Form.Control>
                          </FormGroup>
                        </div>
                      </div>
                      <div className="row-2 flex gap-x-6">
                        <div className="col w-full">
                          <FormGroup>
                            <Form.Label className="text-sm">
                              Số điện thoại
                            </Form.Label>
                            <Form.Control
                              className="block w-full border outline-none px-2 h-12 rounded text-sm"
                              placeholder="Số điện thoại giao hàng..."
                              value={order.phone}
                              onChange={(e) => {
                                setOrder((curr) => ({
                                  ...curr,
                                  phone: e.target.value,
                                }));
                              }}
                            ></Form.Control>
                          </FormGroup>
                        </div>
                      </div>
                      <div className="row-2 flex gap-x-6">
                        <div className="col w-full">
                          <FormGroup>
                            <Form.Label className="text-sm">
                              Địa chỉ giao hàng
                            </Form.Label>
                            <Form.Control
                              className="block w-full border outline-none px-2 h-12 rounded text-sm"
                              placeholder="Số nhà, Tòa nhà, Tên đường..."
                              value={order.adress}
                              onChange={(e) => {
                                setAddressShipping((curr) => ({
                                  ...curr,
                                  address: e.target.value,
                                }));
                              }}
                            ></Form.Control>
                          </FormGroup>
                        </div>
                      </div>
                      <div className="row-3 flex gap-x-6">
                        <div className="col-l w-1/3">
                          <FormGroup>
                            <Form.Label className="text-sm">
                              Xã/Phường
                            </Form.Label>
                            <Form.Control
                              className="block w-full border outline-none px-2 h-12 rounded text-sm"
                              required
                              placeholder="Xã/Phường"
                              onChange={(e) => {
                                setAddressShipping((curr) => ({
                                  ...curr,
                                  ward: e.target.value,
                                }));
                              }}
                            ></Form.Control>
                          </FormGroup>
                        </div>
                        <div className="col-m w-1/3">
                          <FormGroup>
                            <Form.Label className="text-sm">
                              Quận/Huyện
                            </Form.Label>
                            <Form.Control
                              className="block w-full border outline-none px-2 h-12 rounded text-sm"
                              placeholder="Quận/Huyện"
                              onChange={(e) => {
                                setAddressShipping((curr) => ({
                                  ...curr,
                                  district: e.target.value,
                                }));
                              }}
                            ></Form.Control>
                          </FormGroup>
                        </div>
                        <div className="col-r w-1/3">
                          <FormGroup>
                            <Form.Label className="text-sm">
                              Tỉnh/Thành phố
                            </Form.Label>

                            <Form.Select
                              onChange={(e) => {
                                setAddressShipping((curr) => ({
                                  ...curr,
                                  city: e.target.value,
                                }));
                              }}
                              className="block w-full border outline-none px-1 h-12 rounded text-sm"
                            >
                              <option value="">Tỉnh/Thành phố</option>
                              <option value="Đà Nẵng">Đà Nẵng</option>
                              <option value="Hà Nội">Hà Nội</option>
                              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                            </Form.Select>
                          </FormGroup>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="shipping-method">
                  <div className="heading-title text-2xl pb-4 font-semibold">
                    Phương thức giao hàng
                  </div>
                  <div className="shipping-method-selected">
                    <Form className="flex w-full">
                      <div className="shipping-1 w-full ">
                        <div className="shipping-check flex gap-x-2 px-4 py-6 border rounded-t-2xl">
                          <div className="col-1 w-1/2 flex gap-x-2">
                            <Form.Check
                              type="radio"
                              name="shipping-select"
                              onClick={handleShippingCost}
                              value="0"
                              data-code="normal_delivery"
                              onChange={(e) => {
                                setOrder((curr) => ({
                                  ...curr,
                                  orderShipping: e.target.dataset.code,
                                }));
                              }}
                            ></Form.Check>
                            <div className="shipping-desc">
                              <Form.Label aria-describedby="shipping-desc">
                                Giao hàng tiết kiệm
                              </Form.Label>
                              <Form.Text
                                id="shipping-desc"
                                className="block text-gray-dark"
                              >
                                Giao hàng trong vòng 6-8 ngày
                              </Form.Text>
                            </div>
                          </div>
                          <div className="shipping-price flex justify-end items-center w-1/2">
                            <span>Miễn phí</span>
                          </div>
                        </div>
                        <div className="shipping-check flex gap-x-2 px-4 py-6 border rounded-b-2xl">
                          <div className="col-1 w-1/2 flex gap-x-2">
                            <Form.Check
                              type="radio"
                              name="shipping-select"
                              onClick={handleShippingCost}
                              value="18000"
                              data-code="fast_delivery"
                              onChange={(e) => {
                                setOrder((curr) => ({
                                  ...curr,
                                  orderShipping: e.target.dataset.code,
                                }));
                              }}
                            ></Form.Check>
                            <div className="shipping-desc">
                              <Form.Label aria-describedby="shipping-desc">
                                Giao hàng nhanh
                              </Form.Label>
                              <Form.Text
                                id="shipping-desc"
                                className="block text-gray-dark"
                              >
                                Giao hàng trong vòng 3-4 ngày
                              </Form.Text>
                            </div>
                          </div>
                          <div className="shipping-price flex justify-end items-center w-1/2">
                            <span>{formattedNumber(18000)} VNĐ</span>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="payment-method">
                  <div className="heading-title text-2xl p-4 font-semibold">
                    Phương thức thanh toán
                  </div>
                  <div className="payment-method-selected">
                    <Form className="flex w-full">
                      <div className="shipping-1 w-full ">
                        <div className="payment-check flex gap-x-2 px-4 py-6 border rounded-t-2xl">
                          <div className="col-1 w-1/2 flex gap-x-2">
                            <Form.Check
                              type="radio"
                              name="payment-select"
                              onClick={handlePaymentMethodSelected}
                              value="COD"
                            ></Form.Check>
                            <div className="payment-desc">
                              <Form.Label aria-describedby="payment-desc">
                                Thanh toán khi nhận hàng (COD)
                              </Form.Label>
                              <Form.Text
                                id="payment-desc"
                                className="block text-gray-dark"
                              >
                                Nhận hàng rồi mới trả tiền
                              </Form.Text>
                            </div>
                          </div>
                        </div>
                        <div className="payment-check flex gap-x-2 px-4 py-6 border rounded-b-2xl">
                          <div className="col-1 w-1/2 flex gap-x-2">
                            <Form.Check
                              type="radio"
                              name="payment-select"
                              onClick={handlePaymentMethodSelected}
                              value="PAYPAL"
                            ></Form.Check>
                            <div className="payment-desc">
                              <Form.Label aria-describedby="payment-desc">
                                Thanh toán bằng PayPal
                              </Form.Label>
                              <Form.Text
                                id="payment-desc"
                                className="block text-gray-dark"
                              >
                                Thanh toán nhanh chóng, tiện lợi, an toàn
                              </Form.Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="checkout-col-right w-1/2">
                <div className="items-checkout">
                  {cartData.map((item, index) => (
                    <div key={index} className="item-checkout py-1">
                      <div className="item-checkout-wrapper flex h-26 gap-x-8">
                        <div className="item-image-wrapper relative h-32 w-28 flex items-center ">
                          <div className="item-image w-24 border flex justify-center rounded-2xl overflow-hidden border-gray-light ">
                            <div className="image w-20">
                              <img
                                src={item.product.thumbnail}
                                className="object-cover"
                                alt=""
                              />
                            </div>
                            <div className="item-quantity absolute top-0 right-1 bg-gray-light w-7 h-7 flex items-center justify-center rounded-full text-sm">
                              {item.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="item-info flex items-center h-26 ">
                          <div className="item-info-wrapper">
                            <div className="item-name">
                              <span className="text-semibold font-josefin">
                                {item.product.name}
                              </span>
                            </div>
                            <div className="item-size-color">
                              <span className="text-gray-dark text-sm">
                                {item.sizes.name} / {item.colors.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="item-price grow flex justify-center items-center">
                          <div className="item-price-wrapper h-26 item-center">
                            <span className="text-red font-josefin text-xl">
                              {formattedNumber(
                                item.product.price *
                                  (1 - item.product.discount / 100) *
                                  item.quantity
                              )}
                              VNĐ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="money-total">
                  <div className="subtotal flex py-1">
                    <div className="subtotal-label w-1/2">
                      <span className="font-semibold">Tổng tiền sản phẩm:</span>
                    </div>
                    <div className="subtotal-money flex justify-end w-1/3 pr-2">
                      <span className="font-josefin">
                        {formattedNumber(totalRecent)} VNĐ
                      </span>
                    </div>
                  </div>
                  <div className="shipping-cost flex py-1">
                    <div className="shipping-label w-1/2">
                      <span className="font-semibold">Phí ship:</span>
                    </div>
                    <div className="shipping-money flex justify-end w-1/3 pr-2">
                      <span className="font-josefin">
                        {shippingMoney === 0
                          ? "Miễn phí"
                          : formattedNumber(shippingMoney) + " VNĐ"}
                      </span>
                    </div>
                  </div>
                  <div className="subtotal flex py-1">
                    <div className="subtotal-label w-1/2">
                      <span className="font-semibold">Tổng tiền:</span>
                    </div>
                    <div className="subtotal-monet flex justify-end w-1/3 pr-2">
                      <span className="text-red text-xl font-josefin">
                        {formattedNumber(totalCost)} VNĐ
                      </span>
                    </div>
                  </div>
                  <div className="payment-btn pt-4">
                    {paymentMethod === "COD" && (
                      <button
                        onClick={handleCheckOut}
                        className="w-full text-white py-4 bg-heavy-red font-josefin text-xl uppercase hover:bg-red"
                      >
                        Đặt hàng
                      </button>
                    )}
                    {paymentMethod === "PAYPAL" && (
                      <PayPal amount={totalCost / 23000} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default CheckOutPage;
