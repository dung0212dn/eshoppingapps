import React from "react";
import { useContext } from "react";
import { useReducer } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import {formattedNumber} from "../../configs/Methods"
import FilterContex from "../../Context/FilterContex";

const FilterBar = (props) => {
  const [filter, dispatch] = useContext(FilterContex);

  const handleSort = (event) => {
    dispatch({
      type: "FILTER_SORT_BY",
      payload: event.target.value,
    });
  };

  const handleFilterMaxPrice = (event) =>{
      const numberFormated = formattedNumber(event.target.value)
      dispatch({
            type: "SET_MAX_PRICE",
            payload: event.target.value,
          });
  }

  const handleFilterMinPrice = (event) =>{
      dispatch({
            type: "SET_MIN_PRICE",
            payload: event.target.value,
          });
  }

  return (
    <>
      <div className="widget-filter-1">
        <div className="heading-title mb-3">
          <span className=" font-josefin text-3xl ">Lọc và sắp xếp</span>
        </div>
        <div className="widget-content">
          <div className="collect-fiter-form">
            <Form action="" className=" divide-gray-dark divide-y-2">
              <div className="sort-filter flex h-32 py-8">
                <label className="w-1/4 flex justify-start items-center">
                  Sắp xếp:
                </label>
                <Form.Select
                  onChange={handleSort}
                  className="w-3/4 px-2 border focus:outline-none text"
                >
                  <option value="">Chọn cách sắp xếp</option>
                  <option value="price">Theo giá từ thấp đến cao</option>
                  <option value="-price">Theo giá từ cao đến thấp</option>
                  <option value="name">Theo tên A đến Z</option>
                  <option value="-name">Theo tên Z đến A</option>
                </Form.Select>
              </div>
              <div className="price-filter h-40 py-8">
                <div className="heading-title mb-3">
                  <span className=" font-josefin text-3xl ">Mức giá:</span>
                </div>
                <div className="price-input flex h-1/2">
                  <label className="w-1/6 flex justify-center items-center">
                    Từ:
                  </label>
                  <Form.Control
                    onChange={handleFilterMinPrice}
                    className="w-2/6 px-2 border border-gray-dark outline-none"
                  ></Form.Control>
                  <label className="w-1/6 flex justify-center items-center">
                    Đến:
                  </label>
                  <Form.Control
                    onChange={handleFilterMaxPrice}
                    className="w-2/6 border border-gray-dark px-2 outline-none"
                  ></Form.Control>
                </div>
              </div>
              <div className="colors-filter  py-8">
                <div className="heading-title mb-3">
                  <span className=" font-josefin text-3xl ">Màu sắc</span>
                </div>
                <div className="colors">
                  {props.propsProducts.colors.map((item, index) => (
                    <div className="color-item flex" key={index}>
                      <Form.Check type="checkbox" className="pr-3 pb-2" />
                      <Form.Check.Label>{item.name}</Form.Check.Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sizes-filter py-8">
                <div className="heading-title mb-3">
                  <span className=" font-josefin text-3xl ">Kích thước</span>
                </div>
                <div className="sizes">
                  {props.propsProducts.sizes.map((item, index) => (
                    <div className="size-item flex" key={index}>
                      <Form.Check type="checkbox" className="pr-3 pb-2" />
                      <Form.Check.Label>{item.name}</Form.Check.Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="features-filter py-8">
                <div className="heading-title mb-3">
                  <span className=" font-josefin text-3xl ">Tình trạng</span>
                </div>
                <div className="feature">
                  <div className="feature-item flex">
                    <div className="feature-col-1 w-4/5 flex">
                      <Form.Check type="checkbox" className="pr-3 pb-2" />
                      <Form.Check.Label>Phiên bản giới hạn</Form.Check.Label>
                    </div>
                    <div className="feature-col-2 w-1/5 flex justify-end">
                      <Form.Check.Label className="text-gray-dark">(16)</Form.Check.Label>
                    </div>
                  </div>
                  <div className="feature-item flex">
                    <div className="feature-col-1 w-4/5 flex">
                      <Form.Check type="checkbox" className="pr-3 pb-2" />
                      <Form.Check.Label>Đang giảm giá</Form.Check.Label>
                    </div>
                    <div className="feature-col-2 w-1/5 flex justify-end">
                      <Form.Check.Label className="text-gray-dark">(40)</Form.Check.Label>
                    </div>
                  </div>
                  <div className="feature-item flex">
                    <div className="feature-col-1 w-4/5 flex">
                      <Form.Check type="checkbox" className="pr-3 pb-2" />
                      <Form.Check.Label>Hàng mới</Form.Check.Label>
                    </div>
                    <div className="feature-col-2 w-1/5 flex justify-end">
                      <Form.Check.Label className="text-gray-dark">(123)</Form.Check.Label>
                    </div>
                  </div>
                  <div className="feature-item flex">
                    <div className="feature-col-1 w-4/5 flex">
                      <Form.Check type="checkbox" className="pr-3 pb-2" />
                      <Form.Check.Label>Được mua nhiều</Form.Check.Label>
                    </div>
                    <div className="feature-col-2 w-1/5 flex justify-end">
                      <Form.Check.Label className="text-gray-dark">(22)</Form.Check.Label>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
