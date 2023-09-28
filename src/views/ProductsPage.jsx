import React, { useContext, useReducer, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import PageTitle from "../layouts/Section/PageTitle";
import ProductsList from "../components/Products/ProductsList";
import Loading from "../layouts/Loading";
import { useEffect } from "react";
import API, { endpoints } from "../configs/API";
import { useSearchParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import FilterReducer from "../Reducer/FilterReducer";
import FilterBar from "../layouts/Bar/FilterBar";
import FilterContex from "../Context/FilterContex";

const Products = () => {
  const [productsList, setProductsList] = useState({
    count: null,
    previous: null,
    next: null,
    results: null,
  });
  const [page, setPage] = useState(1);
  const [q] = useSearchParams();
  const [propsProducts, setPropsProducts] = useState({
    colors: [],
    sizes: [],
  });
  const [filter, dispatch] = useReducer(FilterReducer, {
    sort_by: null,
    min_price: 0,
    max_price: 0,
  });

  useEffect(() => {
    const loadProducts = async () => {
      let e = `${endpoints["products"]}?page=${page}`;
      
      let kw = q.get("kw");
      if (kw !== null) {
        e += `&kw=${kw}`;
      }

      let category = q.get("category");
      if (category !== null) e += `&category=${category}`;

      if (filter.sort_by !== null) e += `&sort_by=${filter.sort_by}`;

      if (filter.min_value !== 0) e += `&min_price=${filter.min_price}`;

      if (filter.max_price !== 0) e += `&max_price=${filter.max_price}`;

      let res = await API.get(e);

      setProductsList(res.data);
    };

    loadProducts();
  }, [page, q, filter.sort_by, filter.min_price, filter.max_price]);

  useEffect(() => {
    const loadPropsProducts = async () => {
      let eColors = endpoints["colors"];
      let eSizes = endpoints["sizes"];

      let resColors = await API.get(eColors);
      let resSizes = await API.get(eSizes);

      setPropsProducts((prevProps) => ({
        ...prevProps,
        colors: resColors.data,
        sizes: resSizes.data,
      }));
    };

    loadPropsProducts();
  }, []);

  const nextPage = () => {
    setPage((current) => current + 1);
  };

  const prevPage = () => {
    setPage((current) => current - 1);
  };

  if (
    productsList.results === null ||
    propsProducts.colors === null ||
    propsProducts.sizes === null
  )
  return <Loading/>;
  else if (productsList.length === 0)
    return (
      <>
        <Container className="pb-10">
          <PageTitle title="Sản phẩm"></PageTitle>
          <div className="mx-auto w-11/12 text-4xl h-40 flex justify-center items-center uppercase font-josefin text-heavy-red">
            Không có sản phẩm!
          </div>
        </Container>
      </>
    );
 else return (
    <>
      <FilterContex.Provider value={[filter, dispatch]}>
        <Container className="pb-10">
          <PageTitle title="Sản phẩm"></PageTitle>
          <div className="product-container">
            <div className="product-wrapper flex mx-auto w-11/12">
              <div className="products-filter-bar w-3/12 pr-12">
                <FilterBar propsProducts={propsProducts} />
              </div>
              <div className="products-list w-9/12 px-4 ">
                <ProductsList products={productsList.results}></ProductsList>
                <ButtonGroup
                  aria-label="paging"
                  className="m-1 flex w-full justify-end mt-4"
                >
                  {productsList.previous === null ? (
                    <Button
                      onClick={prevPage}
                      variant="primary"
                      className="hidden mx-4"
                    >
                      <i class="fa-solid fa-circle-arrow-left text-2xl text-bronze hover:text-heavy-red"></i>
                    </Button>
                  ) : (
                    <Button
                      onClick={prevPage}
                      variant="primary"
                      className="mx-4"
                    >
                      <i class="fa-solid fa-circle-arrow-left text-2xl text-bronze hover:text-heavy-red"></i>
                    </Button>
                  )}

                  {productsList.next === null ? (
                    <Button
                      onClick={nextPage}
                      variant="primary"
                      className=" mx-4 hidden"
                    >
                      <i class="fa-solid fa-circle-arrow-right text-2xl text-bronze hover:text-heavy-red"></i>
                    </Button>
                  ) : (
                    <Button
                      onClick={nextPage}
                      variant="primary"
                      className="mx-4 "
                    >
                      <i class="fa-solid fa-circle-arrow-right text-2xl text-bronze hover:text-heavy-red"></i>
                    </Button>
                  )}
                </ButtonGroup>
              </div>
            </div>
          </div>
        </Container>
      </FilterContex.Provider>
    </>
  );
};

export default Products;
