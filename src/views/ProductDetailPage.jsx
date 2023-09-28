import React, { useEffect, useRef, useState, useContext } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import API, { endpoints } from "../configs/API";
import { formattedNumber } from "../configs/Methods";
import cookie from "react-cookies";
import queryString from "query-string";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Rating from "../components/Products/Rating";
import PageTitle from "../layouts/Section/PageTitle";
import CartContext from "../Context/CartContext";
import UserContext from "../Context/UserContext";
import { useDispatch } from "react-redux";
import Tabbed from "../components/Comment/Tabbed";

const ProductDetailPage = (props) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  // const [cartState, cartDispatch] = useContext(CartContext);
  const [user, userDispatch] = useContext(UserContext);
  const cartDispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [message, setMessage] = useState({
    type: null,
    content: null,
  });

  useEffect(() => {
    try {
      const loadProduct = async () => {
        const res = await API.get(endpoints["product-detail"](productId));
        setProduct(res.data);
      };

      loadProduct();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    try {
      const loadLikeProduct = async () => {
        const res = await API.get(endpoints["get-like"](productId), {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        });

        setLike(res.data.active);
      };

      loadLikeProduct();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleIncreseProduct = () => {
    setProductQuantity(productQuantity + 1);
  };

  const handleDecreseProduct = () => {
    if (productQuantity > 1) setProductQuantity(productQuantity - 1);
  };

  const handleAddToCart = () => {
    if (user === null) {
      alert("Vui lòng đăng nhập để sử dụng tính năng này!!");
    } else {
      cartDispatch({
        type: "ADD_TO_CART",
        payload: {
          product: product,
          size: selectedSize,
          color: selectedColor,
        },
      });

      const addToCart = async () => {
        try {
          const res = await toast.promise(
            API.post(
              endpoints["add-to-cart"](productId),
              {
                size: selectedSize,
                color: selectedColor,
                quantity: productQuantity,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${cookie.load("access_token")}`,
                },
              }
            ),
            {
              pending: "Đang thêm sản phẩm",
              success: "Đã thêm sản phẩm vào giỏ hàng",
            }
          );
        } catch (error) {
          // Xử lý khi request bị lỗi
          if (error.response) {
            // Request đã được gửi và server đã trả về status code không phù hợp
            toast.error(error.response.data.message);
          }
        }
      };

      addToCart();
    }
  };

  const handleLikeProduct = (e) => {
    if (user === null) {
      return toast.warning("Vui lòng đăng nhập để thích sản phẩm");
    } else {
      const productID = document.getElementById("idProduct").value;
      const likeProduct = async () => {
        try {
          const res = await API.post(
            endpoints["like-product"](parseInt(productID)),
            {},
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${cookie.load("access_token")}`,
              },
            }
          );
          console.log(res.data);
          setLike(res.data.active);
        } catch (error) {}
      };
      likeProduct();
    }
  };

  if (product === null) return "Đang tải...";

  return (
    <>
      <Container className="pb-10">
        <PageTitle title="Chi tiết sản phẩm"></PageTitle>
        <div className="products-detail-container">
          <div className="product-detail-wrapper mx-auto w-11/12">
            <div className="product-details-cols flex gap-x-8">
              <div className="prod-details-col-left w-1/2 ">
                <div className="products-detail-image w-full">
                  <img
                    className="object-cover"
                    src={product.thumbnail}
                    alt="ss"
                  />
                </div>
              </div>
              <div className="prod-details-col-left w-1/2">
                <div className="product-info">
                  <div className="rating flex">
                    <Rating rating={product.rating}></Rating>
                    <span className="rating-count px-2 text-gray-dark">
                      ({product.rating ? product.rating.toFixed(1) : 0})
                    </span>
                  </div>
                  <div className="product-name py-2">
                    <span className=" font-opensans text-3xl">
                      {product.name}
                    </span>
                  </div>
                  <div className="product-price flex h-11">
                    <div className="price-origin  text-gray-dark h-full pr-4 text-3xl font-josefin flex justify-start items-center">
                      <span className="line-through font-josefin pr-1">
                        {formattedNumber(product.price)}
                      </span>
                      VNĐ
                    </div>
                    <div className="price-discount text-red px-4 font-josefin h-full text-3xl flex justify-start items-center">
                      <span className=" font-josefin pr-1">
                        {formattedNumber(
                          product.price * (1 - product.discount / 100)
                        )}
                      </span>
                      VNĐ
                    </div>
                    <div className="discount text-white pl-2 bg-heavy-red font-josefin text-xl flex justify-start items-center h-3/4 px-2 ">
                      <span className="font-josefin">
                        Giảm {product.discount}%
                      </span>
                    </div>
                  </div>
                  <hr className=" text-gray my-3" />
                  <div className="product-type">
                    <ul>
                      <li className="product-category flex w-1/2 pb-2">
                        <span className="label-type  font-josefin text-xl w-1/2">
                          Loại sản phẩm
                        </span>
                        <span className="flex justify-center items-center pr-8 text-xl font-josefin">
                          :
                        </span>
                        <span className="label-type text-gray-dark text-xl ">
                          <Link to="/" className="hover:text-red font-josefin">
                            {product.category.name}
                          </Link>
                        </span>
                      </li>
                      <li className="product-product-code flex w-1/2 pb-2">
                        <span className="label-type  font-josefin text-xl w-1/2">
                          Mã sản phẩm
                        </span>
                        <span className="flex justify-center items-center pr-8 text-xl font-josefin">
                          :
                        </span>
                        <span className="label-type text-gray-dark font-josefin text-xl ">
                          AKSH
                        </span>
                      </li>
                      <li className="product-shop flex w-1/2 pb-2">
                        <span className="label-type  font-josefin text-xl w-1/2">
                          Cửa hàng
                        </span>
                        <span className="flex justify-center items-center pr-8 text-xl font-josefin">
                          :
                        </span>
                        <span className="label-type text-gray-dark  text-xl ">
                          <Link
                            to="/shop/"
                            className="hover:text-red font-josefin"
                          >
                            {product.shop.name}{" "}
                          </Link>
                        </span>
                      </li>
                      <li className="product-color w-1/2 pb-2">
                        <span className="label-type  font-josefin text-xl w-1/2">
                          Màu sắc:
                        </span>
                        <ul className="colors-list flex gap-x-6">
                          {product.colors.map((item, index) => (
                            <li key={index} className="py-2">
                              <button
                                className={`border w-16 px-2 py-1 font-josefin ${
                                  selectedColor === item.id
                                    ? "bg-bronze text-white"
                                    : ""
                                }`}
                                type="button"
                                value={item.id}
                                onClick={(e) => {
                                  setSelectedColor(item.id);
                                }}
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="product-size w-1/2 pb-6">
                        <span className="label-type  font-josefin text-xl w-1/2">
                          Kích thước:
                        </span>
                        <ul className="colors-list flex gap-x-6">
                          {product.sizes.map((item, index) => (
                            <li key={index} className="py-2">
                              <button
                                className={`border w-16 px-2 py-1 font-josefin ${
                                  selectedSize === item.id
                                    ? "bg-bronze text-white"
                                    : ""
                                }`}
                                type="button"
                                value={item.id}
                                onClick={(e) => {
                                  setSelectedSize(item.id);
                                }}
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="product-quantity w-1/2 h-14 pb-2 flex gap-6">
                        <div className="label-type font-josefin text-xl h-full flex justify-start items-center ">
                          Số lượng:
                        </div>
                        <div className="button-quatity-form flex h-full border-2 border-gray-light ">
                          <button
                            onClick={handleDecreseProduct}
                            className="justify-start w-12 hover:bg-dark-orange hover:text-white"
                          >
                            <i class="fa-solid fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="h-full font-josefin text-xl text-center w-12 outline-none"
                            value={productQuantity}
                            onChange={() => ""}
                          />
                          <button
                            onClick={handleIncreseProduct}
                            className="justify-end w-12 hover:bg-dark-orange hover:text-white"
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="product-buttons flex w-full  h-12 my-6 items-center gap-x-6">
                    <div className="product-button-add-cart w-full h-full">
                      <button
                        onClick={handleAddToCart}
                        className="w-full h-full text-xl text-white font-josefin hover:bg-black hover:text-white uppercase bg-heavy-red"
                      >
                       Thêm vào giỏ hàng
                      </button>
                    </div>
                    {/* <div className="product-form-buy-now w-1/2 h-full">
                      <button className="w-full h-full text-xl font-josefin uppercase border hover:bg-black hover:text-white">
                        Buy it now
                      </button>
                    </div> */}
                  </div>
                  <div className="product-liked">
                    <div className="product-like-btn">
                      <input
                        type="hidden"
                        id="idProduct"
                        value={product.id}
                      ></input>
                      <button onClick={handleLikeProduct} className="like">
                        <i
                          className={`fa-solid text-gray-dark fa-heart text-xl ${
                            like === true ? "text-heavy-red" : ""
                          }`}
                        ></i>
                      </button>
                      <span className="px-2 text-xl font-josefin">
                        Yêu thích sản phẩm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-detail-des">
              <div className="product-detail-des-wrapper py-10">
                <Tabbed product={product}></Tabbed>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer autoClose={4000} />
      </Container>
    </>
  );
};

export default ProductDetailPage;
