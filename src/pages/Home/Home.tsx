import React, { useEffect, useState } from 'react';

import './Home.scss';
import Category from './Category/Category';
// import CATEGORY_ITEMS from '../../constants/category';
import ProductCategories from '../../api/product_categories';

const Home = () => {
  const [categories, setCategories] = useState([]);

  // const categoryItems = CATEGORY_ITEMS;

  const getAllCategories = async () => {
    await ProductCategories.GetAllCategories()
      .then((resp) => {
        setCategories(resp.data.data.categories);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getAllCategories().then();
  }, []);

  return (
    <div className="home_container">
      <div className="home_content">
        {
          categories.length !== 0
          && (
            <Category data={categories} />
          )
        }
      </div>
    </div>
  );
};
export default Home;
