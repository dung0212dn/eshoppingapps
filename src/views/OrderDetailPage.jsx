import React from "react";
import PageTitle from "../layouts/Section/PageTitle";
import { Container } from "react-bootstrap";
import Loading from "../layouts/Loading";
import { useState } from "react";
import { useEffect } from "react";
import API, { authAPI, endpoints } from "../configs/API";
import { Link, useParams } from "react-router-dom";
import cookie from "react-cookies";
import { formattedNumber } from "../configs/Methods";
import moment from "moment";
import ReactModal from "react-modal";
import { ToastContainer, toast } from "react-toastify";

const OrderDetailPage = () => {
  const [order, setOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const { orderId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "400px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

  const loadOrder = async () => {
    const res = await API.get(endpoints["get-order"](orderId), {
      headers: {
        Authorization: `Bearer ${cookie.load("access_token")}`,
      },
    });
    setOrder(res.data);
  };

  useEffect(() => {
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

  useEffect(() => {
    const loadOrderDetail = async () => {
      try {
        const res = await API.get(endpoints["order-detail-all"](orderId), {
          headers: {
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        });
        setOrderDetail(res.data);
      } catch (error) {}
    };
    loadOrderDetail();
  }, []);

  const handleDestroyOrder = () => {
    try {
      const res = toast.promise( API.patch(
        endpoints["get-order"](orderId),
        {
          status: "cancelled",
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        },
        
      ), {
        success: "Hủy đơn hàng thành công"
      });
      setShowModal(false)
      loadOrder()
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau!")
    }
  };


  if (order === null || orderDetail === null) return <Loading></Loading>;
  return (
    <>
      <PageTitle title="Chi tiết đơn hàng"></PageTitle>
      <Container>
        <div className="order-detail-container pb-20">
          <div className="order-detail-wrapper mx-auto w-10/12">
            <div className="order-detail-list flex gap-x-12">
              <div className="order-detail-list w-1/2">
                <div className="heading pb-3 text-center w-full">
                  <span className="text-2xl uppercase font-josefin  text-red">
                    Danh sách sản phẩm
                  </span>
                </div>
                <table className="cart-list w-full ">
                  <thead>
                    <tr className="border-b-2 uppercase  border-gray-light">
                      <th colSpan={2} className="font-josefin text-left py-6">
                        Sản phẩm
                      </th>

                      <th colSpan={1} className="font-josefin text-center">
                        Số lượng
                      </th>

                      <th colSpan={1} className="font-josefin text-right">
                        Tổng tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail.map((item, index) => (
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

                        <td className="quantity text-center font-josefin text-xl">
                          {item.quantity}
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
              <div className="order-info w-1/2">
                <div className="order-info-wrapper">
                  <div className="heading pb-3 text-center">
                    <span className="text-2xl uppercase font-josefin text-red">
                      Thông tin đặt hàng
                    </span>
                  </div>
                  <ul className="pl-20">
                    <li className="product-category flex pb-2">
                      <span className="label-type font-josefin text-xl w-2/5">
                        Tên người nhận:
                      </span>

                      <span className="label-type font-josefin text-xl w-3/5">
                        {order.name}
                      </span>
                    </li>
                    <li className="product-category flex pb-2">
                      <span className="label-type font-josefin text-xl w-2/5">
                        Số điện thoại:
                      </span>

                      <span className="label-type font-josefin text-xl w-3/5">
                        {order.phone}
                      </span>
                    </li>
                    <li className="product-category flex pb-2">
                      <span className="label-type font-josefin text-xl w-2/5">
                        Địa chỉ:
                      </span>

                      <span className="label-type font-josefin text-xl w-3/5">
                        {order.address}
                      </span>
                    </li>
                    <li className="product-category flex pb-2">
                      <span className="label-type font-josefin text-xl w-2/5">
                        Email:
                      </span>

                      <span className="label-type font-josefin text-xl w-3/5">
                        {order.email}
                      </span>
                    </li>
                    <li className="product-category flex pb-2">
                      <span className="label-type font-josefin text-xl w-2/5">
                        Vận chuyển:
                      </span>

                      <span className="label-type font-josefin text-xl w-3/5">
                        {order.status_ship === "normal_delivery"
                          ? "Vận chuyển thường"
                          : "Vận chuyển nhanh"}
                      </span>
                    </li>
                    <li className="product-category flex pb-2">
                      <span className="label-type font-josefin text-xl w-2/5">
                        Trạng thái đơn hàng:
                      </span>

                      <span className="label-type text-xl font-josefin text-heavy-red w-3/5">
                        {handleSetStatus(order.status)}
                      </span>
                    </li>
                    <li className="product-category flex pb-2">
                      <span className="label-type font-josefin text-xl w-2/5">
                        Ngày đặt hàng:
                      </span>

                      <span className="label-type font-josefin text-xl w-3/5">
                        {moment(order.created_date).format(
                          " DD/MM/yyyy  HH:mm"
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="cart-footer mx-auto w-full py-12">
              <div className="total-price w-full flex justify-end">
                <div className="cart-footer-left w-1/2 flex justify-start">
                  <Link
                    to="/products"
                    className="shopping border flex justify-center items-center font-semibold hover:bg-black hover:text-white py-4 px-8 font-josefin uppercase"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
                <div className="order-footer-right w-1/2 flex justify-end">
                  <div className="footer-wrapper">
                    <div className="check-out w-full">
                      {order.status === "created" ? (
                        <button
                          onClick={() => setShowModal(true)}
                          className="block text-center py-4 px-8 uppercase font-josefin text-white hover:bg-red bg-heavy-red"
                        >
                          Hủy đơn hàng
                        </button>
                      ) : (
                        <button className="block text-center py-4 px-8 uppercase font-josefin border cursor-not-allowed">
                          Hủy đơn hàng
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReactModal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <div className="modal-content text-xl font-josefin pt-4 pb-6">
            Bạn có chắc muốn hủy đơn hàng?
          </div>
          <div className="modal-btn flex w-full justify-end gap-x-6">
            <button
              onClick={() => setShowModal(false)}
              className="close-modal py-2 px-6 border-gray-dark border text-xl font-josefin hover:bg-dark-orange hover:text-white"
            >
              Không
            </button>
            <button
              onClick={handleDestroyOrder}
              className="destroy-order py-2 px-6 text-xl bg-dark-orange font-josefin hover:bg-heavy-red hover:text-white"
            >
              Hủy đơn hàng
            </button>
          </div>
        </ReactModal>
      </Container>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default OrderDetailPage;
