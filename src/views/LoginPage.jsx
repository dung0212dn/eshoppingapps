import React, { useContext } from "react";
import LoginForm from "../components/AccountUser/LoginForm";
import Header from "../layouts/base/Header";
import { CategoriesContext } from "../Context/CategoriesContext";
import Breadcrums from "../layouts/Breadcrums/Breadcrums";
import Footer from "../layouts/base/Footer";
import { Container } from "react-bootstrap";
import HeaderTopBar from "../layouts/base/HeaderTopBar";
import PageTitle from "../layouts/Section/PageTitle";

const LoginPage = () => {
  
  return (
    <>
      <Container>
        <PageTitle title="Đăng nhập"></PageTitle>
        <div className="login-form mx-auto w-5/12 py-28">
          <LoginForm></LoginForm>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
