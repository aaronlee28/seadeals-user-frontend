import React from 'react';
import Navbar from '../../layouts/Navbar/Navbar';
import Footer from '../../layouts/Footer/Footer';

import './Home.scss';
import Category from './Category/Category';
import CATEGORY_ITEMS from '../../constants/category';

const Home = () => {
  const categoryItems = CATEGORY_ITEMS;
  return (
    <div className="home_container">
      <Navbar />
      <div className="home_content">
        <Category data={categoryItems} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
