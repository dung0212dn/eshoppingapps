import React from "react";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Comment from "./Comment";

const Tabbed = (props) => {
  const [key, setKey] = useState("desc");

  return (
    <Tabs>
      <TabList className="flex gap-2">
        <Tab
          onClick={() => {
            setKey("desc");
          }}
          className="px-5 py-3 border font-josefin text-xl border-gray-light outline-none focus:bg-heavy-red focus:text-white"
        >
          Mô tả sản phẩm
        </Tab>
        <Tab
          onClick={() => {
            setKey("comments");
          }}
          className="px-5 py-3 border font-josefin text-xl border-gray-light outline-none focus:bg-heavy-red focus:text-white"
        >
          Bình luận
        </Tab>
      </TabList>

      <TabPanel
        className={`product-desc min-h-fit border border-gray-light px-8 py-5 font-josefin ${
          key === "desc" ? `` : `hidden`
        } `}
      >
       <div className="font-josefin" dangerouslySetInnerHTML={{__html: props.product.description}}></div> 
      </TabPanel>
      <TabPanel
        className={`product-desc min-h-fit border border-gray-light px-8 py-5 font-josefin ${
          key === "comments" ? `` : `hidden`
        } `}
      >
        <Comment product={props.product}></Comment>
      </TabPanel>
    </Tabs>
  );
};

export default Tabbed;
