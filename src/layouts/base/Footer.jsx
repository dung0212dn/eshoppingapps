import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const menus = [
    { title: "Trang chủ", route: "home" },
    { title: "Danh mục", route: "categories" },
    { title: "Sản phẩm", route: "products" },
    { title: "Về chúng tôi", route: "about" },
    { title: "Liên hệ", route: "contact" },
]

const license = [
    { title: "Ưu đãi", route: "home" },
    { title: "Chăm sóc khách hàng", route: "categories" },
    { title: "Thanh toán và giao hàng", route: "products" },
    { title: "Trả hàng, Hoàn tiền", route: "about" },
]

const links = [
    { name: 'facebook', icon: 'fa-brands fa-facebook', route: ' ' },
    { name: 'youtube', icon: 'fa-brands fa-youtube', route: ' ' },
    { name: 'instagram', icon: 'fa-brands fa-instagram', route: ' ' },
    { name: 'linkedin', icon: 'fa-brands fa-linkedin', route: ' ' },
    { name: 'twitter', icon: 'fa-brands fa-twitter', route: ' ' }
]

  return (
    <>
     <div className="footer bg-gray-light">
            <div className="footer-wrapper mx-auto w-11/12 pt-24 font-josefin divide-y-2 divide-gray-dark">
                  <div className="footer-content w-full h-88 grid grid-cols-4">
                        <div className="footer-col">
                              <div className="footer-heading text-2xl pb-3 mb-8">
                                    Thông tin cửa hàng
                              </div>
                              <ul className="footer-list flex flex-col gap-y-4 pr-12">
                                    <li className="footer-address leading-normal">
                                          <i className="fa-solid fa-location-dot pr-2 text-bronze leading-normal"></i>
                                          123 Nguyễn Kiệm, phường 3, Gò Vấp, TP.Hồ Chí Minh
                                    </li>
                                    <li className="footer-mail tracking-wide">
                                          <i className="fa-solid fa-envelope pr-2 text-bronze"></i>support@lasttwiglight.com
                                    </li>
                                    <li className="footer-phone tracking-wider">
                                          <i className="fa-solid fa-phone pr-2 text-bronze"></i>0901 123 456
                                    </li>
                              </ul>
                        </div>
                        <div className="footer-col pl-10">
                              <div className="footer-heading text-2xl pb-3 mb-8">
                                    Về chúng tôi
                              </div>
                              <ul className="footer-list flex flex-col gap-y-4 ">
                                 
                                    {menus.map((item, index) => (
                                      <li key={index}>
                                       <Link className="text-base text-gray-dark hover:text-bronze" to={item.route}>{item.title}</Link>
                                      </li>
                                    ))}
                              </ul>
                        </div>
                        <div className="footer-col pl-5">
                              <div className="footer-heading text-2xl pb-3 mb-8">
                                    Chính sách & Ưu đãi
                              </div>
                              <ul className="footer-list flex flex-col gap-y-4 ">
                                   
                                    {license.map((item, index) => (
                                      <li key={index}>
                                       <Link  className="text-base text-gray-dark hover:text-bronze" to={item.route}>{item.title}</Link>
                                      </li>
                                    ))}
                              </ul>
                        </div>
                        <div className="footer-col">
                              <div className="footer-heading text-2xl pb-3 mb-8">
                                    Đăng kí nhận tin
                              </div>
                              <span className=" text-gray-dark">Đăng kí để nhận được những thông tin ưu đãi sớm nhất từ chúng
                                    tôi.</span>
                              <div className="subribe-form flex flex-row relative mb-5">
                                    <input type="email" className="email h-10 px-2 w-full focus:outline-none"
                                          placeholder="Email của bạn" />
                                    <button className="submit h-10 text-xl absolute right-0 bg-white w-1/6 ">
                                          <i className="fa-solid fa-envelope-circle-check hover:text-bronze"></i>
                                    </button>
                              </div>
                              <ul className="flex justify-start">
                                   
                                     {links.map((item, index) => (
                                      <li key={index}>
                                       <Link  className="text-base text-gray-dark hover:text-bronze" to={item.route}>{item.title}</Link>
                                      </li>
                                    ))}
                              </ul>
                        </div>
                  </div>
                  <div className="footer-end py-5 flex ">
                        <div className="footer-copyright w-1/2 flex flex-row justify-start items-center">
                              ©
                              <a className=" tracking-wider " href="">Last Twiglight Website</a>. Thiết
                              kế bởi<a className=" tracking-wider " href="">&nbsp;Đinh Văn Tấn Dũng</a>
                        </div>
                        <div className="payment flex justify-end w-1/2">
                              <div className="payment-image">
                                    <img src="../../assets/images/vnpay_banks.png" alt=""></img>
                              </div>

                        </div>
                  </div>
            </div>
      </div>
    </>
  )
}

export default Footer