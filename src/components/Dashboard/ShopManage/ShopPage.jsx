import React, { useEffect } from "react";
import API, { endpoints } from "../../../configs/API";
import { useState } from "react";
import { Table } from "react-bootstrap";
import Loading from "../../../layouts/Loading";
import { formattedNumber } from "../../../configs/Methods";
import { useContext } from "react";
import UserContext from "../../../Context/UserContext";
import PageTitle from "../../../layouts/Section/PageTitle";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const [products, setProducts] = useState(null);
  const [user, userDispatch] = useContext(UserContext);

  useEffect(() => {
    const loadProducts = async () => {
      const shop = await API.get(endpoints["get-business-shop"](user.id));
      const res = await API.get(endpoints["get-products-shop"](shop.data.id));
      setProducts(res.data);
    };

    loadProducts();
  }, []);

  if (products === null) return <Loading></Loading>;
  return (
    <>
      <PageTitle title="Sản phẩm"></PageTitle>
      <div className="btn-add flex justify-end py-4">
        <Link to="/business/product/create" className="add-product px-2 py-3 rounded bg-bronze text-white text-xl uppercase font-semibold">Thêm sản phẩm</Link>
      </div>

      <table className="w-full border border-gray-light">
        <thead>
          <tr className="bg-[#1B4965]">
            <th className="border border-gray-light text-left px-4 py-3 text-white uppercase">
              ID
            </th>
            <th
              className="border border-gray-light text-left px-4 py-3 text-white uppercase"
              colspan="2"
            >
              Tên sản phẩm
            </th>
            <th
              className="border border-gray-light text-center px-4 py-3 text-white uppercase"
              colspan="3"
            >
              Giá
            </th>
            <th
              className="border border-gray-light text-center px-4 py-3 text-white uppercase"
              colspan="1"
            >
              Số lượng
            </th>
            <th
              className="border border-gray-light text-center px-4 py-3 text-white uppercase"
              colspan="1"
            >
              Khuyến mãi
            </th>
            <th
              className="border border-gray-light text-left px-4 py-3 text-white uppercase"
              colspan="2"
            >
              Danh mục sản phẩm
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <>
              <tr className=" even:bg-gray-light" key={index}>
                <td className=" text-left px-2 py-3">{index + 1}</td>
                <td className=" text-left px-2 py-3" colspan="2">
                  {item.name}
                </td>
                <td className=" text-center px-2 py-3" colspan="3">
                  {formattedNumber(item.price)}
                </td>
                <td className=" text-center px-3 py-3" colspan="1">
                  {item.quantity}
                </td>
                <td className=" text-center px-2 py-3" colspan="1">
                  {item.discount}
                </td>
                <td className=" text-left px-2 py-3" colspan="2">
                  {item.category.name}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShopPage;
