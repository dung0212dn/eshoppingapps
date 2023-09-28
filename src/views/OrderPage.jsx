import React, { useState } from "react";
import PageTitle from "../layouts/Section/PageTitle";
import { Container, ToastContainer } from "react-bootstrap";
import { useEffect } from "react";
import API, { endpoints } from "../configs/API";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../layouts/Loading";
import { formattedNumber } from "../configs/Methods";
import { useTranslation } from "react-i18next";

const OrderPage = () => {
  const [orders, setOrders] = useState(null);
  const nav = useNavigate()

  useEffect(() => {
    const loadOrder = async () => {
      const res = await API.get(endpoints["user-order"], {
        headers: {
          Authorization: `Bearer ${cookie.load("access_token")}`,
        },
      });
      console.log(res.data);

      setOrders(res.data);
    };
    loadOrder();
  }, []);

  const handleSetStatus = (status) => {
    switch (status) {
      case "created":
        return "Chờ xác nhận";
      case "confirm":
        return "Đã xác nhận";

      case "shipped":
        return "Đang vận chuyển";

      case "delivered":
        return "Đã giao";

      case "cancelled":
        return "Đã hủy";
    }
  };
  if (orders === null) return <Loading></Loading>;
  return (
    <>
      <PageTitle title="Đơn hàng" />
      <Container>
        <div className="order-container">
          <div className="order-wrapper mx-auto w-11/12">
            <table className="order-list w-full">
              <thead>
                <tr className="border-b-2 uppercase  border-gray-light">
                  <th className="font-josefin text-left py-6">Mã đơn hàng</th>
                  <th className="font-josefin text-center">
                    Thông tin đơn hàng
                  </th>
                  <th className="font-josefin text-center">Tổng tiền</th>
                  <th colSpan={1} className="font-josefin text-center">
                    Trạng thái đơn hàng
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr 
                    key={index}
                    className="h-52 px-6 py-2 border-b-2 border-gray-dark cursor-pointer"
                    onClick={() => {nav(`/order/${item.id}`)}}
                  >
                    <td className="order-item__id w-32 text-center font-josefin">
                      {item.id}
                    </td>

                    <td
                      className="order-item__detail flex items-center h-52 pl-32"
                      colSpan={1}
                    >
                      <div className="info flex flex-col gap-y-3 w-full ">
                        <span className=" font-josefin">
                          Tên người đặt hàng: {item.name}
                        </span>
                        <span className=" font-josefin">
                          Email: {item.email}
                        </span>
                        <span className=" font-josefin">
                          Địa chỉ: {item.address}
                        </span>
                      </div>
                    </td>
                    <td className="text-center text-xl font-josefin text-red">
                      {formattedNumber(item.total_amount)} VNĐ
                    </td>
                    <td className="text-center font-josefin text-heavy-red">{handleSetStatus(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="order-footer mx-auto w-11/12 py-12">
            <div className="order-price w-full flex ">
              <div className="order-footer-left w-full flex justify-end">
                <Link
                  to="/products"
                  className="shopping border flex justify-center items-center font-semibold hover:bg-black hover:text-white py-4 px-8 font-josefin uppercase"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default OrderPage;
