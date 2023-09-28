import React, { memo, useState } from "react";
import PageTitle from "../layouts/Section/PageTitle";
import { Button, Container, Form } from "react-bootstrap";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../layouts/Loading";
import { ToastContainer, toast } from "react-toastify";
import API, { endpoints } from "../configs/API";
import UserRegister from "../components/AccountUser/UserRegister";
import BusinessRegister from "../components/AccountUser/BusinessRegister";

const RegisterPage = () => {
const [key, setKey] = useState('user')

  return (
    <>
      <PageTitle title="Đăng kí" />
      <Container>
        <div className="signup-container">
          <div className="signup-wrapper mx-auto w-10/12 mb-16">
            <Tabs>
              <TabList className={`flex justify-center`}>
                <Tab
                 onClick={() => {
                  setKey("user");
                }}
                  className={`border border-gray-light px-4 py-3 uppercase font-josefin text-xl focus:bg-heavy-red focus:text-white`}
                >
                  Đăng kí người mua
                </Tab>
                <Tab
                 onClick={() => {
                  setKey("business");
                }}
                  className={`border border-gray-light px-4 py-3 uppercase font-josefin text-xl focus:bg-heavy-red focus:text-white`}
                >
                  Đăng kí người bán
                </Tab>
              </TabList>

              <TabPanel className={`border w-full border-gray-light py-2 ${key === 'user' ? '' : `hidden`}`}>
               <UserRegister></UserRegister>
              </TabPanel>
              <TabPanel className={`border w-full border-gray-light py-2 ${key === 'business' ? '' : `hidden`}`}>
               <BusinessRegister></BusinessRegister>
              </TabPanel>
            </Tabs>

            {/* <div className="signup-form">
                  <div className="signup-title">
                        <span>Đăng kí người dùng</span>
                  </div>
              <Form>

              </Form> */}
            {/* </div> */}
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};


export default RegisterPage;
