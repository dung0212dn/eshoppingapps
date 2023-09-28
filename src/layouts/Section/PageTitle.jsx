import React from "react";
import Breadcrums from "../Breadcrums/Breadcrums";

const PageTitle = (props) => {
  return (
    <>
      <div className="page-title h-52 bg-gray-light mb-10">
        <div className="page-title-wrapper mx-auto w-10/12 py-8 h-full">
          <div className="breadcrumbs-bar h-1/4">
            <Breadcrums></Breadcrums>
          </div>
          <div className="title  flex justify-center items-center font-josefin text-5xl uppercase tracking-wider font-semibold">{props.title}</div>
        </div>
      </div>
    </>
  );
};

export default PageTitle;
