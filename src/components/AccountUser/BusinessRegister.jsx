import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import API, { endpoints } from "../../configs/API";
import Loading from "../../layouts/Loading";
import { Form } from "react-bootstrap";
import { memo } from "react";

const BusinessRegister = () => {
  const [business, setBusiness] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    address: "",
    phone: "",
    taxCode: "",
  });

  const avatar = useRef();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const setValue = (value, key) => {
    setBusiness({ ...business, [key]: value });
  };

  const setErr = (err) => {
    return toast.error(err);
  };

  const register = (evt) => {
    evt.preventDefault();

    const process = async () => {
      let form = new FormData();
      form.append("first_name", business.firstName);
      form.append("last_name", business.lastName);
      form.append("username", business.username);
      form.append("password", business.password);
      form.append("email", business.email);
      form.append("address", business.address);
      form.append("business_name", business.businessName);
      form.append("phone", business.phone);
      form.append("tax_code", business.taxCode);
      form.append("avatar", avatar.current.files[0]);

      try {
        let res = await API.post(endpoints["register-business"], form, {
          headers: {
            "Content-Type": "multiple/form-data",
          },
        });

        if (res.status === 201) nav("/login");
      } catch (ex) {
        let e = "";
        for (let d of Object.values(ex.response.data)) e += `${d} <br />`;
        setErr(e);
      } finally {
        setLoading(false);
      }
    };

    if (business.username === "" || business.password == "")
      setErr("Username và password bắt buộc nhập!");
    else if (business.password !== business.confirmPassword)
      setErr("Mật khẩu không khớp!");
    else if (
      business.phone   === ""||
      business.address === "" ||
      business.businessName  === ""||
      business.taxCode === ""
    ) {
      setErr("Vui lòng điền đầy đủ thông tin!");
   
    } else {
      setLoading(true);
      process();
    }
  };
  return (
    <>
      <div className="form-user-register flex justify-center w-full py-4">
        <div className="form-title w-full text-center">
          <span className="text-2xl uppercase font-josefin font-bold text-center w-full">
            Đăng kí người bán
          </span>
          <span className="block w-full text-gray-dark">
            Đăng kí người dùng để thực hiện mua bán nhanh chóng, tiện lợi
          </span>
        </div>
      </div>
      <Form onSubmit={register} className="mx-auto w-1/2 py-8">
        <InputItem
          label="Tên người dùng"
          controlId="first_name"
          value={business.firstName}
          type="text"
          setValue={(e) => setValue(e.target.value, "firstName")}
        />

        <InputItem
          label="Họ và chữ lót"
          controlId="last_name"
          value={business.lastName}
          type="text"
          setValue={(e) => setValue(e.target.value, "lastName")}
        />

        <InputItem
          label="Email"
          controlId="email"
          value={business.email}
          type="email"
          setValue={(e) => setValue(e.target.value, "email")}
        />

        <InputItem
          label="Tên đăng nhập"
          controlId="username"
          value={business.username}
          type="text"
          setValue={(e) => setValue(e.target.value, "username")}
        />

        <InputItem
          label="Mật khẩu"
          controlId="password"
          value={business.password}
          type="password"
          setValue={(e) => setValue(e.target.value, "password")}
        />

        <InputItem
          label="Xác nhận mật khẩu"
          controlId="confirm"
          value={business.confirmPassword}
          type="password"
          setValue={(e) => setValue(e.target.value, "confirmPassword")}
        />

        <InputItem
          label="Tên của doanh nghiệp"
          controlId="business_name"
          value={business.businessName}
          type="text"
          setValue={(e) => setValue(e.target.value, "businessName")}
        />

        <InputItem
          label="Địa chỉ"
          controlId="address"
          value={business.address}
          type="text"
          setValue={(e) => setValue(e.target.value, "address")}
        />

        <InputItem
          label="Số điện thoại"
          controlId="phone"
          value={business.phone}
          type="text"
          setValue={(e) => setValue(e.target.value, "phone")}
        />

        <InputItem
          label="Mã số thuế"
          controlId="tax_code"
          value={business.taxCode}
          type="text"
          setValue={(e) => setValue(e.target.value, "taxCode")}
        />

        <Form.Group className="mb-3" controlId="avatar">
          <Form.Label>Ảnh đại diện</Form.Label>
          <Form.Control className="block mt-1" type="file" ref={avatar} />
        </Form.Group>
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

export default BusinessRegister;
