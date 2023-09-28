import React, { useContext, useEffect, useState } from "react";
import Header from "../layouts/base/Header";
import Footer from "../layouts/base/Footer";
import { Breadcrumb, Container } from "react-bootstrap";
import API, { endpoints } from "../configs/API";
import Loading from "../layouts/Loading";
import ProductsSlider from "../components/Products/ProductsSlider";
import SectionTitle from "../layouts/Section/SectionTitle";
import ServiceCustomer from "../layouts/ServiceCustomer";
import LoginForm from "../components/AccountUser/LoginForm";
import { CategoriesContext } from "../Context/CategoriesContext";

const Home = () => {
  // const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);

  const categories = useContext(CategoriesContext)

  useEffect(() => {
    const loadProducts = async () => {
      let e = `${endpoints["products"]}?page=${page}`;
      let res = await API.get(e);

      setProducts(res.data.results);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  if (categories === null || products === null) return <Loading />;

  return (
    <>
   
      
      <Container className="mx-auto w-11/12">
        <div className="product-slider py-4">
          <div className="section-title">
            <SectionTitle
              sectionTitle={{
                name: "Sale chớp nhoáng",
                icon: "fa-solid fa-bolt text-gold-star",
              }}
            ></SectionTitle>
          </div>
          <ProductsSlider products={products}></ProductsSlider>
        </div>
        <div className="service-customer">
          <ServiceCustomer></ServiceCustomer>
        </div>
        <div className="product-slider py-6">
          <div className="section-title">
            <SectionTitle
              sectionTitle={{
                name: "Hàng mới về",
                icon: "fa-solid fa-wand-magic-sparkles text-blue",
              }}
            ></SectionTitle>
          </div>
          <ProductsSlider products={products}></ProductsSlider>
        </div>
      </Container>

 
    </>
  );
};


export default Home;
