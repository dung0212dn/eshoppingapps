import React from 'react'

const ServiceCustomer = () => {
  return (
      <div className="service-customer-container">
      <div className="service-customer-wrapper grid grid-cols-4 font-josefin">
            <div className="service-customer-item flex py-20 justify-start">
                  <div className="service-icon flex justify-center items-center px-4"><i
                              className="fa-regular fa-paper-plane text-4xl"></i></div>
                  <div className="service-content">
                        <div className="service-title text-xl">Miễn phí vận chuyển</div>
                        <div className="service-desc text-sm text-gray-dark">Đơn hàng trên 1.000.000 VNĐ</div>
                  </div>
               
            </div>
            <div className="service-customer-item flex py-20 justify-center">
                  <div className="service-icon flex justify-center items-center px-4"><i
                              className="fa-solid fa-arrow-right-arrow-left text-4xl"></i></div>
                  <div className="service-content">
                        <div className="service-title text-xl">Đổi hàng trong vòng 30 ngày</div>
                        <div className="service-desc text-sm text-gray-dark">Trả hàng trong vòng 7 ngày </div>
                  </div>
            </div>
            <div className="service-customer-item flex py-20 justify-center">
                  <div className="service-icon flex justify-center items-center px-4"><i
                              className="fa-regular fa-credit-card text-4xl"></i></div>
                  <div className="service-content">
                        <div className="service-title text-xl">Thanh toán tiện lợi</div>
                        <div className="service-desc text-sm text-gray-dark">Chấp nhận nhiều phương thức thanh toán</div>
                  </div>
            </div>
            <div className="service-customer-item flex py-20 justify-center">
                  <div className="service-icon flex justify-center items-center px-4"><i
                              className="fa-solid fa-headphones text-4xl"></i></div>
                  <div className="service-content">
                        <div className="service-title text-xl">Hỗ trợ khách hàng 24/7</div>
                       <div className="service-desc text-sm text-gray-dark">Tư vấn khách hàng nhiệt tình</div>
                  </div>
            </div>
      </div>
</div>
  )
}

export default ServiceCustomer