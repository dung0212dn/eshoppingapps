import React, { useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const searchRef = useRef()
  const handleSearch = () => {
    
    navigate(`/products/?kw=${keyword}`)
    
  }

  
  return (
    <>
      <div className="search-bar w-full flex h-12">
        <input
          ref={searchRef}
          className="search-box border border-gray-light w-full px-2 outline-none focus:border-black"
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          value ={keyword}
          onChange={e => setKeyword(e.target.value)}
          
        />
        <Button type="button" onClick={handleSearch} className="border border-gray-light w-12 hover:bg-dark-orange hover:text-white">
          <i className="fa-solid fa-magnifying-glass "></i>
        </Button>
      </div>
    </>
  );
};

export default SearchBar;
