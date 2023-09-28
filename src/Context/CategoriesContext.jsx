import { useState, createContext, useEffect } from "react";
import API, { endpoints } from "../configs/API";

const CategoriesContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      let e = `${endpoints["categories"]}`;
      let res = await API.get(e);

      setCategories(res.data);
    };

    loadCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoryProvider };
