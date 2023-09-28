import axios from "axios";
import React from "react";
import { useEffect } from "react";

const CityForm = () => {

useEffect(() => {
      const loadData = () => {
      
}
}, [])
  return (
    <>
      <select
        class="form-select form-select-sm mb-3"
        id="city"
        aria-label=".form-select-sm"
      >
        <option value="" selected>
          Chọn tỉnh thành
        </option>
      </select>

      <select
        class="form-select form-select-sm mb-3"
        id="district"
        aria-label=".form-select-sm"
      >
        <option value="" selected>
          Chọn quận huyện
        </option>
      </select>

      <select
        class="form-select form-select-sm"
        id="ward"
        aria-label=".form-select-sm"
      >
        <option value="" selected>
          Chọn phường xã
        </option>
      </select>
    </>
  );
};

export default CityForm;
