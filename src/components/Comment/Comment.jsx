import React, { useEffect, useState } from "react";
import API, { endpoints } from "../../configs/API";
import Rating from "../Products/Rating";
import moment from "moment/moment";
import { Button, ButtonGroup, Form, FormLabel } from "react-bootstrap";
import cookie from "react-cookies";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";
import Loading from "../../layouts/Loading";
import { current } from "@reduxjs/toolkit";

const Comment = (props) => {
  const [comments, setComments] = useState({
    count: null,
    previous: null,
    next: null,
    results: null,
  });
  const [rating, setRating] = useState(0);
  const [commentPost, setCommentPost] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [user, userDispatch] = useContext(UserContext);
  const [page, setPage] = useState(1);

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const nextPage = () => {
    setComments((current) => ({
      ...current,
      results: null,
    }));
    setPage((current) => current + 1);
  };

  const prevPage = () => {
    setComments((current) => ({
      ...current,
      results: null,
    }));

    setPage((current) => current - 1);
  };

  const handlePostReview = (e) => {
    e.preventDefault();
    if (commentPost === "") toast.warning("Vui lòng nhập nội dung bình luận");
    else {
      const postComment = async () => {
        try {
          const res = await toast.promise(
            API.post(
              endpoints["post-product-review"](props.product.id),
              {
                rating: rating,
                comment: commentPost,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${cookie.load("access_token")}`,
                },
              }
            ),
            {
              pending: "Đang xử lý yêu cầu",
              success: "Đăng bình luận thành công",
            }
          );
          setComments((current) => ({
            ...current,
            results: [res.data, ...current.results],
          }));
        } catch (error) {
          if (error) toast.error("Đăng bình luận thất bại. Có lỗi xảy ra!");
        }
      };
      postComment();
      setShowForm(!showForm)
    }
  };

  const handleShowForm = () => {
    if (user === null) toast.warning("Vui lòng đăng nhập để viết bình luận");
    else {
      setShowForm(!showForm);
    }
  };

  useEffect(() => {
    const loadComment = async () => {
      let e = `${endpoints["get-product-review"](
        props.product.id
      )}?page=${page}`;
      try {
        const res = await API.get(e);
        setComments(res.data);
      } catch (error) {}
    };

    loadComment();
  }, [page]);

  if (comments.results === null) return "Đang tải bình luận...";
  console.log(page);
  return (
    <>
      <div className="comment-container divide-y-2 divide-gray-light">
        <div className="comment-header pb-6 flex">
          <div className="review-header-col-left w-1/2">
            <div className="comment-header-title">
              <span className=" text-xl uppercase font-josefin">
                Bình luận của khách hàng
              </span>
            </div>
            <div className="product-rating">
              <Rating rating={props.product.rating}></Rating>
            </div>
          </div>
          <div className="review-header-col-right w-1/2 flex justify-end items-center">
            <button
              onClick={handleShowForm}
              className="px-4 py-3 border outline-none font-josefin text-xl h-full hover:bg-heavy-red hover:text-white"
            >
              Viết bình luận
            </button>
          </div>
        </div>
        <div
          className={`review-form-container py-4 ${
            showForm === true ? "" : "hidden"
          }`}
        >
          <div className="review-form-wrapper">
            <div className="form-title">
              <span className="uppercase font-josefin">
                Viết bình luận của bạn
              </span>
            </div>
            <div className="rating-vote py-2">
              {[...Array(5)].map((_, index) => {
                return (
                  <i
                    key={index}
                    onClick={() => handleRatingClick(index)}
                    className={`fa-solid fa-star pr-1 text-sm ${
                      index < rating ? "text-gold-star" : "text-gray"
                    }`}
                  ></i>
                );
              })}
            </div>
            <Form className="py-3">
              <Form.Label className="font-josefin">Nội dung: </Form.Label>
              <Form.Control
                className="w-full border outline-none border-gray-light p-2 font-josefin h-40"
                as="textarea"
                aria-label="With textarea"
                value={commentPost}
                onChange={(e) => {
                  setCommentPost(e.target.value);
                }}
              />
              <div className="btn-submit-review flex justify-end w-full">
                <button
                  onClick={handlePostReview}
                  className="font-josefin py-3 px-4 border hover:bg-heavy-red hover:text-white"
                >
                  Gửi bình luận
                </button>
              </div>
            </Form>
          </div>
        </div>
        <div className="product-reviews-container divide-y-2 divide-gray-light py-2">
          {comments.results.map((item, index) => (
            <div key={index} className="product-review-wrapper py-4">
              <div className="product-review-header">
                <div className="product-review-name">
                  <span className=" text-xl font-josefin">
                    {item.user.first_name + " " + item.user.last_name}
                  </span>
                </div>
                <div className="product-review-time">
                  <span className=" text-sm text-gray-dark font-josefin">
                    Đăng vào
                    <span className="text-black text-sm font-josefin px-1">
                      {moment(item.created_date).format("DD-MM-YYYY")}
                    </span>
                    lúc
                    <span className="text-black text-sm font-josefin px-1">
                      {moment(item.created_date).format("HH:mm")}
                    </span>
                  </span>
                </div>
                <div className="product-rating">
                  <Rating rating={item.rating}></Rating>
                </div>
                <div className="product-review-content py-4">
                  <span className=" text-base  font-josefin">
                    {item.comment}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <ButtonGroup
            aria-label="paging"
            className="m-1 flex w-full justify-end mt-4"
          >
            {comments.previous === null ? (
              <Button
                onClick={prevPage}
                variant="primary"
                className="hidden mx-4"
              >
                <i class="fa-solid fa-circle-arrow-left text-2xl text-bronze hover:text-heavy-red"></i>
              </Button>
            ) : (
              <Button onClick={prevPage} variant="primary" className="mx-4">
                <i class="fa-solid fa-circle-arrow-left text-2xl text-bronze hover:text-heavy-red"></i>
              </Button>
            )}

            {comments.next === null ? (
              <Button
                onClick={nextPage}
                variant="primary"
                className=" mx-4 hidden"
              >
                <i class="fa-solid fa-circle-arrow-right text-2xl text-bronze hover:text-heavy-red"></i>
              </Button>
            ) : (
              <Button onClick={nextPage} variant="primary" className="mx-4 ">
                <i class="fa-solid fa-circle-arrow-right text-2xl text-bronze hover:text-heavy-red"></i>
              </Button>
            )}
          </ButtonGroup>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Comment;
