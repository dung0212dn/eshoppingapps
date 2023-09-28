import React from "react";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./style/Breadcrum.css";

const Breadcrums = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <Breadcrumb aria-label="breadcrumbs">
        
        <Breadcrumb.Item linkAs={Link}  linkProps={{to : '/'}}>Home</Breadcrumb.Item>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Breadcrumb.Item active key={routeTo}>
              {name.replace(/[-]/g, ' ')}
            </Breadcrumb.Item> 
          ) : (
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: routeTo }}
              key={routeTo}
            >
              {name}
            </Breadcrumb.Item>
          );
        })}
  
       
      </Breadcrumb>
      {/* <nav aria-label="breadcrumb">
        <ol class="breadcrumb ">
          <li class="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Library
          </li>
        </ol>
      </nav> */}
      {/* <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb> */}
    </>
  );
};

export default Breadcrums;
