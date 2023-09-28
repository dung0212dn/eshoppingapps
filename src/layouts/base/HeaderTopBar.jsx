import React from "react";

const links = [
    { name: 'facebook', icon: 'fa-brands fa-facebook', route: ' ' },
    { name: 'youtube', icon: 'fa-brands fa-youtube', route: ' ' },
    { name: 'instagram', icon: 'fa-brands fa-instagram', route: ' ' },
    { name: 'linkedin', icon: 'fa-brands fa-linkedin', route: ' ' },
    { name: 'twitter', icon: 'fa-brands fa-twitter', route: ' ' }
  ]

  const linkItem = links.map((item, index) => (
    <li className="hover:bg-gray-light" key={index}>
      <a className="px-3 text-md hover:underline" href={item.route}>
        <i className={item.icon}></i>
      </a>
    </li>
  ));
const SocialLinks = () => {
  
}  


const HeaderTopBar = () => {
  return (
    <>
      <div className="header-topbar bg-gray-light px-3 py-2">
        <div className="header-topbar-wrapper flex tracking-wide text-ssm text-gray-dark">
          <div className="content-item-contact-info flex w-1/3">
            <div className="item-contact-info1 px-4 border-r-2 border-gray-dark">
              <i className="fa-solid fa-location-dot"></i>
              <span className="px-2">123 Nguyễn Kiệm, Gò Vấp, HCM </span>
            </div>
            <div className="item-contact-info2 px-4">
              <i className="fa-regular fa-envelope"></i>
              <a className="px-2" href="mailto:support@lasttwiglight.com">
                support@lasttwiglight.com
              </a>
            </div>
          </div>
          <div className="content-item text-center w-1/3">
            <span>Sale siêu sốc đến 30% toàn bộ sản phẩm. </span>
            <a
              href="/"
              className="content-link text-bronze underline-offset-2 underline decoration-1 decoration-bronze"
            >
              Mua ngay!
            </a>
          </div>
          <div className="content-item-social-media w-1/3">
        <ul className="flex justify-end">
          {linkItem}
        </ul>
      </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTopBar;
