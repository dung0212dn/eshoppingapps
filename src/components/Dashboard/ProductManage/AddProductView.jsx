import React from "react";
import PageTitle from "../../../layouts/Section/PageTitle";
import { useForm } from "react-hook-form";
import API, { endpoints } from "../../../configs/API";
import Loading from "../../../layouts/Loading";
import { useEffect } from "react";
import { useState } from "react";
import { Form, ToastContainer } from "react-bootstrap";
import { memo } from "react";
import { useRef } from "react";
import cookie from "react-cookies";
import { toast } from "react-toastify";

const AddProductView = () => {
  const [categories, setCategories] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colorsAdd, setColorsAdd] = useState({ name: "" });
  const [sizesAdd, setSizesAdd] = useState({ name: "" });
  const { register, handleSubmit, errors } = useForm();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const thumbnail = useRef();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    quantity: "",
    category: "",
  });

  const setValue = (value, key) => {
    setProduct({ ...product, [key]: value });
  };

  const setErr = (err) => {
    return toast.error(err);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    colors.forEach((color) => {
      formData.append("colors", color);
    });
    sizes.forEach((size) => {
      formData.append("sizes", size);
    });
    formData.append("thumbnail", thumbnail.current.files[0]);
    formData.append("category", product.category);
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    const createProduct = async () => {
      try {
        let res = await API.post(endpoints["products"], formData, {
          headers: {
            "Content-Type": "multiple/form-data",
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        });
        
      } catch (ex) {
        let e = "";
        for (let d of Object.values(ex.response.data)) e += `${d}`;
        setErr(e);
      } finally {
        setLoading(false);
      }
    };
    if (
      (product.name === "" ||
        product.price === "" ||
        product.discount === "" ||
        product.quantity === "" ||
        colors === [],
      sizes === [])
    ) {
      setErr("Vui lòng điền đầy đủ thông tin!");
    } else {
      setLoading(true);
      createProduct();
    }
  };

  const handleAddColor = () => {
    const color = document.getElementById("inputColor").value;
    setColors([...colors, color]);

    document.getElementById("inputColor").value = "";
  };

  const handleAddSize = () => {
    const size = document.getElementById("inputSize").value;
    setSizes([...sizes, size]);

    document.getElementById("inputSize").value = "";
  };

  const loadCategories = async () => {
    try {
      const res = await API.get(endpoints["categories"]);
      console.log(res.data);
      setCategories(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (colors === [] || categories === null) return <Loading></Loading>;
  return (
    <>
      <div className="form-user-register flex justify-center w-full py-4">
        <div className="form-title w-full text-center">
          <span className="text-2xl uppercase font-josefin font-bold text-center w-full">
            Thêm sản phẩm
          </span>
        </div>
      </div>
      <Form onSubmit={onSubmit} className="mx-auto w-full py-8">
        <InputItem
          label="Tên sản phẩm"
          controlId="product_name"
          value={product.name}
          type="text"
          setValue={(e) => setValue(e.target.value, "name")}
        />

        <InputItem
          label="Giá"
          controlId="price"
          value={product.price}
          type="text"
          setValue={(e) => setValue(e.target.value, "price")}
        />

        <InputItem
          label="Khuyến mãi"
          controlId="address"
          value={product.discount}
          type="text"
          setValue={(e) => setValue(e.target.value, "discount")}
        />

        <InputItem
          label="Số lượng"
          controlId="quantity"
          value={product.quantity}
          type="text"
          setValue={(e) => setValue(e.target.value, "quantity")}
        />

        {/* <InputItem
          label="Số điện thoại"
          controlId="phone"
          value={shop.phone}
          type="text"
          setValue={(e) => setValue(e.target.value, "phone")}
        /> */}
        <div className="add-color py-4">
          <Form.Label className="pr-4"> Màu:</Form.Label>
          <Form.Select multiple className="border pl-1 pr-3 w-32">
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </Form.Select>
          <Form.Group>
            <Form.Label>Thêm màu:</Form.Label>
            <input
              className="block border w-1/4 h-10 px-2 outline-none border-gray-light mt-1 focus:border-black rounded"
              id="inputColor"
              value={colorsAdd.name}
              type="text"
              onChange={(e) => {
                setColorsAdd(e.target.value);
              }}
            />
            <button
              className="px-3 py-2 mt-2 bg-dark-orange text-white"
              type="button"
              onClick={handleAddColor}
            >
              Thêm màu
            </button>
          </Form.Group>
        </div>
        <div className="add-size py-4">
          <Form.Label className="pr-4"> Size:</Form.Label>
          <Form.Select multiple className="border pl-1 pr-3 w-32">
            {sizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </Form.Select>
          <Form.Group>
            <Form.Label>Thêm size:</Form.Label>
            <input
              className="block border w-1/4 h-10 px-2 outline-none border-gray-light mt-1 focus:border-black rounded"
              id="inputSize"
              value={sizesAdd.name}
              type="text"
              onChange={(e) => {
                setSizesAdd(e.target.value);
              }}
            />
            <button
              className="px-3 py-2 mt-2 bg-dark-orange text-white"
              type="button"
              onClick={handleAddSize}
            >
              Thêm size
            </button>
          </Form.Group>
        </div>

        <Form.Label className="pr-4"> Danh mục sản phẩm:</Form.Label>
        <Form.Select
          className="border pl-1 pr-3 py-2"
          onChange={(e) => setValue(e.target.value, "category")}
        >
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>

        <Form.Group className="mb-3 mt-6" controlId="thumbnail">
          <Form.Label>Ảnh sản phẩm</Form.Label>
          <Form.Control className="block mt-1" type="file" ref={thumbnail} />
        </Form.Group>

        {loading ? (
          <Loading />
        ) : (
          <div className="btn-submit flex w-full justify-end">
            <button
              type="submit"
              className="border px-8 py-2 uppercase font-josefin bg-dark-orange text-white hover:bg-heavy-red flex justify-end"
            >
              Thêm sản phẩm
            </button>
          </div>
        )}
      </Form>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default AddProductView;

const InputItem = memo(({ label, value, setValue, controlId, type }) => {
  return (
    <>
      <Form.Group className=" mb-3" controlId={controlId}>
        <Form.Label className="">{label}</Form.Label>
        <Form.Control
          type={type}
          value={value}
          onChange={setValue}
          placeholder={label}
          className="block border w-full h-10 px-2 outline-none border-gray-light mt-1 focus:border-black rounded"
        />
      </Form.Group>
    </>
  );
});
