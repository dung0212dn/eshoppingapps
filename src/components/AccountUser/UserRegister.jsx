import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import API, { endpoints } from "../../configs/API";
import Loading from "../../layouts/Loading";
import { Form } from "react-bootstrap";
import { memo } from "react";

const UserRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const avatar = useRef();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const setValue = (value, key) => {
    setUser({ ...user, [key]: value });
  };

  const setErr = (err) => {
    return toast.error(err);
  };

  const register = (evt) => {
    evt.preventDefault();

    const process = async () => {
      let form = new FormData();
      form.append("first_name", user.firstName);
      form.append("last_name", user.lastName);
      form.append("username", user.username);
      form.append("password", user.password);
      form.append("email", user.email);
      form.append("avatar", avatar.current.files[0]);
      for (const [key, value] of form.entries()) {
        console.log(`${key}: ${value}`);
      }
      try {
        let res = await API.post(endpoints["register-user"], form, {
          headers: {
            "Content-Type": "multiple/form-data",
          },
        });

        if (res.status === 201) nav("/login");
      } catch (ex) {
        let e = "";
        for (let d of Object.values(ex.response.data)) e += `${d}`;
        setErr(e);
      } finally {
        setLoading(false);
      }
    };

    if (user.username === "" || user.password == "")
      setErr("Username và password bắt buộc nhập!");
    else if (
      user.email === "" ||
      user.firstName === "" ||
      user.lastName === ""
    ) {
      setErr("Vui lòng điền đầy đủ thông tin");
    } else if (user.password !== user.confirmPassword)
      setErr("Mật khẩu không khớp!");
    else {
      setLoading(true);
      process();
    }
  };
  return (
    <>
      <div className="form-user-register flex justify-center w-full py-4">
        <div className="form-title w-full text-center">
          <span className="text-2xl uppercase font-josefin font-bold text-center w-full">
            Đăng kí người dùng
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
          value={user.firstName}
          type="text"
          setValue={(e) => setValue(e.target.value, "firstName")}
        />

        <InputItem
          label="Họ và chữ lót"
          controlId="last_name"
          value={user.lastName}
          type="text"
          setValue={(e) => setValue(e.target.value, "lastName")}
        />

        <InputItem
          label="Email"
          controlId="email"
          value={user.email}
          type="email"
          setValue={(e) => setValue(e.target.value, "email")}
        />

        <InputItem
          label="Tên đăng nhập"
          controlId="username"
          value={user.username}
          type="text"
          setValue={(e) => setValue(e.target.value, "username")}
        />

        <InputItem
          label="Mật khẩu"
          controlId="password"
          value={user.password}
          type="password"
          setValue={(e) => setValue(e.target.value, "password")}
        />

        <InputItem
          label="Xác nhận mật khẩu"
          controlId="confirm"
          value={user.confirmPassword}
          type="password"
          setValue={(e) => setValue(e.target.value, "confirmPassword")}
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

export default UserRegister;
