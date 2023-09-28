import React, { useContext, useEffect, useState } from "react";
import API, { endpoints } from "../../configs/API";
import {CategoriesContext} from "../../Context/CategoriesContext"
import { Link } from "react-router-dom";

const Categories = () => {
  const categoryContext = useContext(CategoriesContext)

  if (categoryContext == null) return "Đang tải..."
  return (
    <>
      
      <div className="category-container w-full">
        <ul className="category-wrapper shadow-2xl">
          {categoryContext.map((c) => ( 
            <li className=" py-1" key={c.id} >
              <Link className="px-3 py-1 block hover:bg-bronze hover:text-white  bg-white" to={`/products/?category=${c.id}`}>
                <span className="mx-3"><i class="fa-brands fa-shopify"></i></span>
                {c.name}
                </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;
