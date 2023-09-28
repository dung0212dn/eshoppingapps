import React from "react";
import StatsBox from "./StatsBox";
import { useState } from "react";
import API, { authAPI, endpoints } from "../../configs/API";
import cookie from "react-cookies";
import { useEffect } from "react";
import Loading from "../../layouts/Loading";
import { formattedNumber } from "../../configs/Methods";
import LineChart from "../Chart/LineChart";
import { Form } from "react-bootstrap";

const DashboardView = () => {
  const [userCount, setUserCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [productCount, setProductCount] = useState(null);

  const [dataRevenue, setDataRevenue] = useState(null);
  const [dataOrders, setDataOrders] = useState(null);
  const [dataCancelledOrders, setDataCancelledOrders] = useState(null);
  const [chart, setChart] = useState('revenue')

  const loadStatCount = async () => {
    try {
      const res = await API.get(endpoints["stats-count"], {
        headers: {
          Authorization: `Bearer ${cookie.load("access_token")}`,
        },
      });
      setUserCount(res.data.user_count);
      setOrderCount(res.data.order_count);
      setTotalAmount(res.data.total_amount);
      setProductCount(res.data.product_count);
    } catch (error) {}
  };

  const loadDataChart = async () => {
    try {
      const res = await API.get(endpoints["stats-order-by-month"], {
        headers: {
          Authorization: `Bearer ${cookie.load("access_token")}`,
        },
      });
      console.log(res.data.data);
      const formattedRevenueData = res.data.data.map((item) => ({
        x: item.month.split("T")[0],
        y: item.total_amount,
      }));

      const formattedOrderData = res.data.data.map((item) => ({
        x: item.month.split("T")[0],
        y: item.total_orders,
      }));

      const formattedCancelledOrderData = res.data.data.map((item) => ({
        x: item.month.split("T")[0],
        y: item.canceled_orders,
      }));

      setDataRevenue(formattedRevenueData);
      setDataOrders(formattedOrderData);
      setDataCancelledOrders(formattedCancelledOrderData);
    } catch (error) {}
  };

  const data1 = [
    {
      id: "Doanh Thu",
      data: dataRevenue,
    },
  ];

  const data2 = [
    {
      id: "Đơn hàng",
      data: dataOrders,
    },
    {
      id: "Đơn hàng hủy",
      data: dataCancelledOrders
    }
  ];

  useEffect(() => {
    loadStatCount();
    loadDataChart();
    console.log(dataCancelledOrders)
  }, []);

  const handleShowChart = (e) => {
    setChart(e.target.value)
  }

  if (
    userCount === null ||
    orderCount === null ||
    totalAmount === null ||
    productCount === null ||
    dataRevenue === null ||
    dataOrders === null
  )
    return <Loading></Loading>;
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <div className="dashboard-overview flex gap-4">
            <div className="stat-box w-1/4">
              <StatsBox
                title="Số lượng người dùng"
                icon="fa-solid fa-user"
                number={userCount}
                unit="người dùng"
              ></StatsBox>
            </div>
            <div className="stat-box w-1/4">
              <StatsBox
                title="Số lượng đơn hàng"
                icon="fa-solid fa-cart-shopping"
                number={orderCount}
                unit="đơn hàng"
              ></StatsBox>
            </div>
            <div className="stat-box w-1/4">
              <StatsBox
                title="Số lượng sản phẩm"
                icon="fa-solid fa-box-open"
                number={productCount}
                unit="sản phẩm"
              ></StatsBox>
            </div>
            <div className="stat-box w-1/4">
              <StatsBox
                title="Tổng doanh thu"
                icon="fa-solid fa-sack-dollar"
                number={formattedNumber(totalAmount)}
              ></StatsBox>
            </div>
          </div>
          <div className="dashboard-chart h-144 py-7">
            <div className="chart-option w-full flex justify-end px-8">
            <Form.Select
                  onChange={handleShowChart}
                  className=" pl-2 py-2 pr-4 border border-gray-light focus:outline-none text rounded"
                >
                  <option value="">Chọn loại thống kê</option>
                  <option value="revenue">Thống kê doanh thu</option>
                  <option value="order">Thống kê đơn hàng</option>
                </Form.Select>
            </div>
            <div className={`chart-1 h-full py-8 ${chart === 'revenue' ? '' : 'hidden'}`}>
              <div className="chart-title w-full py-2 text-center font-opensans text-2xl uppercase font-extrabold text-heavy-red">Thống kê doanh thu</div>
              <LineChart data={data1} nameX="Thời gian" nameY="Doanh thu"></LineChart>
            </div>

            <div className={`chart-2 h-full py-8 ${chart === 'revenue' ? 'hidden' : ''}`}>
              <div className="chart-title w-full py-2 text-center font-opensans text-2xl uppercase font-extrabold text-heavy-red">Thống kê đơn hàng</div>
              <LineChart data={data2} nameX="Thời gian" nameY="Đơn hàng"></LineChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardView;
