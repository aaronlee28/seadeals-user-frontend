import React, { useEffect, useState } from 'react';

import './Search.scss';
import ProductList from './ProductList/ProductList';
import Products from '../../api/products';
import Filter from '../../components/Filter/Filter';
import ProductCategories from '../../api/product_categories';
import FILTER_PRICE from '../../constants/filter';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filterCategories, setFilterCategories] = useState<any>([]);
  const [categoryValues, setCategoryValues] = useState<any>([]);
  const [priceValues, setPriceValues] = useState<any>({
    minPrice: '',
    maxPrice: '',
  });

  const priceItems = FILTER_PRICE;

  const handleInputCategory = (event: any) => {
    const isExist = categoryValues?.includes(event.target.value);
    if (isExist) {
      const deleteValue = categoryValues.filter((el: any) => el !== event.target.value);
      setCategoryValues(deleteValue);
      console.log(deleteValue);
    }
    if (!isExist) {
      categoryValues.push(event.target.value);
      setCategoryValues(categoryValues);
    }
    console.log(isExist);
  };

  const handleInputPrice = (event: any) => {
    const { name, value } = event.target;
    setPriceValues((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(name, value);
  };

  const getProducts = async () => {
    await Products.GetAllProducts('')
      .then((resp) => {
        setProducts(resp.data.data.products);
      })
      .catch((err) => err);
  };

  const getAllCategories = async () => {
    await ProductCategories.GetAllCategories()
      .then((resp) => {
        // setCategories(resp.data.data.categories);
        const items = [
          {
            inputType: 'checkbox',
            name: 'filterCategories',
            options: resp.data.data.categories,
            label: 'Filter Category',
          },
        ];
        setFilterCategories(items);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getProducts().then();
    getAllCategories().then();
  }, []);

  return (
    <div className="search_container">
      <div className="search_content">
        <div className="left_content">
          <Filter
            filterType="category"
            filterClass="filter-search"
            data={filterCategories}
            values={categoryValues}
            handleInput={handleInputCategory}
          />
          <Filter
            filterType="price"
            filterClass="filter-search"
            data={priceItems}
            values={priceValues}
            handleInput={handleInputPrice}
          />
        </div>
        <div className="right_content">
          <ProductList
            data={products}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
