import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import API, { endpoints } from "../../../configs/API";
import Loading from "../../../layouts/Loading";
import { Form } from "react-bootstrap";
import { memo } from "react";
import cookie from "react-cookies"
import { useContext } from "react";
import UserContext from "../../../Context/UserContext";


const CreateShopPage = () => {
  
  const [shop, setShop] = useState({
    email: "",
    businessName: "",
    address: "",
    phone: "",
    nameShop: "",
  });

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [user, userDispatch] = useContext(UserContext)

  const setValue = (value, key) => {
    setShop({ ...shop, [key]: value });
  };

  const setErr = (err) => {
    return toast.error(err);
  };

  const register = (evt) => {
    evt.preventDefault();

    const process = async () => {
      let form = new FormData();

      form.append("email", shop.email);
      form.append("address", shop.address);
      form.append("phone", shop.phone);
      form.append("name", shop.nameShop);
      

      try {
        let res = await API.post(endpoints["shop"], form, {
          headers: {
            "Content-Type": "multiple/form-data",
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        });

        if (res.status === 201) nav("/shop");
      } catch (ex) {
        let e = "";
        for (let d of Object.values(ex.response.data)) e += `${d}`;
        setErr(e);
      } finally {
        setLoading(false);
      }
    };

    if (
      shop.phone === "" ||
      shop.address === "" ||
      shop.email === "" ||
      shop.shopName === ""
    ) {
      setErr("Vui lòng điền đầy đủ thông tin!");
    } else {
      setLoading(true);
      process();
    }
  };

  if(user === null) return <Loading></Loading>
  if (user.status === '    +           ------    unconfirmed'|| user.groups[0] !== 1) {
    console.log(user)
    return "Bạn không có quyền truy cập"}
  return (
    <>
      <div className="form-user-register flex justify-center w-full py-4">
        <div className="form-title w-full text-center">
          <span className="text-2xl uppercase font-josefin font-bold text-center w-full">
            Tạo cửa hàng
          </span>
          <span className="block w-full text-gray-dark">
            Tạo cửa hàng để đăng bán, quản lý sản phẩm
          </span>
        </div>
      </div>
      <Form onSubmit={register} className="mx-auto w-full py-8">
        <InputItem
          label="Tên cửa hàng"
          controlId="shop_name"
          value={shop.nameShop}
          type="text"
          setValue={(e) => setValue(e.target.value, "nameShop")}
        />

        <InputItem
          label="Email"
          controlId="email"
          value={shop.email}
          type="email"
          setValue={(e) => setValue(e.target.value, "email")}
        />

        <InputItem
          label="Địa chỉ"
          controlId="address"
          value={shop.address}
          type="text"
          setValue={(e) => setValue(e.target.value, "address")}
        />

        <InputItem
          label="Số điện thoại"
          controlId="phone"
          value={shop.phone}
          type="text"
          setValue={(e) => setValue(e.target.value, "phone")}
        />

        {loading ? (
          <Loading />
        ) : (
          <div className="btn-submit flex w-full justify-end">
            <button
              type="submit"
              className="border px-8 py-2 uppercase font-josefin bg-dark-orange text-white hover:bg-heavy-red flex justify-end"
            >
              Đăng kí
            </button>
          </div>
        )}
      </Form>
      <ToastContainer></ToastContainer>
    </>
  );
};

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

export default CreateShopPage;
