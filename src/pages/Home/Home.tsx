import React from 'react';

import './Home.scss';
import Category from './Category/Category';
import CATEGORY_ITEMS from '../../constants/category';

const Home = () => {
  const categoryItems = CATEGORY_ITEMS;
  return (
    <div className="home_container">
      <div className="home_content">
        <Category data={categoryItems} />
      </div>
    </div>
  );
};

export default Home;
