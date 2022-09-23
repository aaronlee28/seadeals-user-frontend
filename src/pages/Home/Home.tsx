import React, { useEffect, useState } from 'react';

import './Home.scss';
import Category from './Category/Category';
import ProductCategories from '../../api/product_categories';
import Products from '../../api/products';
import Recommendation from './Recommendation/Recommendation';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const getAllCategories = async () => {
    await ProductCategories.GetAllCategories()
      .then((resp) => {
        setCategories(resp.data.data.categories);
      })
      .catch((err) => err);
  };

  const getRecommendedProducts = async () => {
    await Products.GetRecommendedProducts()
      .then((resp) => {
        const temp1 = resp.data.data.searched_product;
        const temp2 = temp1.concat(temp1);
        const temp3 = temp2.concat(temp2);
        const temp4 = temp3.concat(temp2);
        setRecommendedProducts(temp4);
        // setRecommendedProducts(resp.data.data.searched_product);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getAllCategories().then();
    getRecommendedProducts().then();
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
        {
          recommendedProducts.length !== 0
          && (
            <Recommendation data={recommendedProducts} />
          )
        }
      </div>
    </div>
  );
};
export default Home;
