import React, { useEffect, useRef, useState } from 'react';

import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import ProductList from './ProductList/ProductList';
import Products from '../../api/products';
import Filter from '../../components/Filter/Filter';
import ProductCategories from '../../api/product_categories';
import { FILTER_PRICE } from '../../constants/filter';
import Sort from '../../components/Sort/Sort';
import SORT_SEARCH from '../../constants/sort';
// import MiniPagination from '../../components/Pagination/MiniPagination';
import Pagination from '../../components/Pagination/Pagination';
import Cities from '../../api/cities';
import FilterDelete from '../../components/Filter/FilterDelete';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [cities, setCities] = useState<any>([]);
  const [cityValues, setCityValues] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [categoryValues, setCategoryValues] = useState<any>('');
  const [priceValues, setPriceValues] = useState<any>({
    minPrice: '',
    maxPrice: '',
  });
  const [ratingValues, setRatingValues] = useState<any>('');
  const [filter, setFilter] = useState('');
  const [sorting, setSorting] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });

  const innerRef = useRef(null);

  const [searchParams] = useSearchParams();
  const getSearchParams = searchParams.get('searchInput');

  const sortOptions = SORT_SEARCH;
  const priceItems = FILTER_PRICE;

  const getProducts = async (tempFilter: string) => {
    console.log(tempFilter);
    await Products.GetAllProducts(tempFilter)
      .then((resp) => {
        setProducts(resp.data.data.products);
        setPagination((prevState: any) => ({
          ...prevState,
          totalPage: resp.data.data.total_page,
        }));
      })
      .catch(() => setProducts([]));
  };

  const getAllCities = async () => {
    await Cities.GetAllCities()
      .then((resp) => {
        const res = resp.data;
        let values: any[] = [];
        for (let i = 0; i < res.length; i += 1) {
          const city = {
            city_id: res[i].city_id,
            city_name: res[i].city_name,
            type: res[i].type,
            isChecked: false,
          };
          values = [...values, city];
        }
        setCities(values);
      })
      .catch((err) => err);
  };

  const getAllCategories = async () => {
    await ProductCategories.GetAllCategories()
      .then((resp) => {
        setCategories(resp.data.data.categories);
      })
      .catch((err) => err);
  };

  const fillFilter = () => {
    let tempFilter = `?limit=30&page=${pagination.page}`;
    if (getSearchParams) {
      tempFilter += `&s=${getSearchParams}`;
    }
    if (categoryValues > 0) {
      tempFilter += `&categoryID=${categoryValues}`;
    }
    if (priceValues.minPrice > 0) {
      tempFilter += `&minAmount=${priceValues.minPrice}`;
    }
    if (priceValues.maxPrice > 0) {
      tempFilter += `&maxAmount=${priceValues.maxPrice}`;
    }
    if (ratingValues > 0) {
      tempFilter += `&rating=${ratingValues}`;
    }
    if (cityValues.length > 0) {
      tempFilter += '&city=';
      for (let i = 0; i < cityValues.length; i += 1) {
        if (i > 0) {
          tempFilter += ',';
        }
        tempFilter += cityValues[i];
      }
    }
    console.log(tempFilter);
    return tempFilter;
  };

  const addCityValues = (cityName: string) => {
    const addedValues = [...cityValues, cityName];
    setCityValues(addedValues);
  };

  const deleteCityValues = (cityName: string) => {
    const deletedValues = cityValues.filter((el: string) => el === cityName);
    setCityValues(deletedValues);
  };

  const handleInputLocation = (values: string) => {
    const checkedCities = cities.map(
      (city: any) => {
        if (city.city_name === values) {
          if (city.isChecked) {
            deleteCityValues(city.city_name);
          }
          if (!city.isChecked) {
            addCityValues(city.city_name);
          }
          const editedCity = city;
          editedCity.isChecked = !city.isChecked;
          return editedCity;
        }
        return city;
      },
    );
    setCities(checkedCities);
  };

  const handleInputCategory = (values: number) => {
    setCategoryValues(values);
  };

  const handleInputPrice = (event: any) => {
    const { name, value } = event.target;
    setPriceValues((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputRating = (number: number) => {
    setRatingValues(number);
  };

  const handleSort = (event: any) => {
    const { value } = event.target;
    setSorting(value);
    const splitValue = value.split(' ');
    let sortBy = '';
    let sort = '';
    if (splitValue[0] === 'Rekomendasi') {
      sortBy = 'views_count';
      sort = 'desc';
    }
    if (splitValue[0] === 'Terbaru') {
      sortBy = 'date';
      sort = 'desc';
    }
    if (splitValue[0] === 'Terlaris') {
      sortBy = 'sold_count';
      sort = 'desc';
    }
    if (splitValue[0] === 'Harga') {
      sortBy = 'price';
      if (splitValue[1] === 'Terendah') {
        sort = 'asc';
      }
      if (splitValue[1] === 'Tertinggi') {
        sort = 'desc';
      }
    }

    let tempFilter = filter;
    tempFilter += `&sortBy=${sortBy}`;
    tempFilter += `&sort=${sort}`;
    getProducts(tempFilter).then();
  };

  const handlePagination = (newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));
  };

  const handleDeleteCategoryFilter = () => {
    setCategoryValues('');
  };

  const handleDeletePriceFilter = () => {
    setPriceValues({
      minPrice: '',
      maxPrice: '',
    });
  };

  const handleDeleteRatingFilter = () => {
    setRatingValues('');
  };

  const handleDeleteLocationFilter = () => {
    setCityValues([]);
    const deleteAllCitiesChecked = cities.map(
      (item: any) => {
        const tempItem = item;
        tempItem.isChecked = false;
        return tempItem;
      },
    );

    setCities(deleteAllCitiesChecked);
  };

  const handleDeleteAllFilter = () => {
    handleDeleteLocationFilter();
    handleDeleteCategoryFilter();
    handleDeleteRatingFilter();
    handleDeletePriceFilter();
    setFilter('');
  };

  useEffect(() => {
    setFilter(`?limit=30&page=1&s=${getSearchParams}`);
    getProducts(`?limit=30&page=1&s=${getSearchParams}`).then();
    getAllCategories().then();
    getAllCities().then();
  }, []);

  useEffect(() => {
    const tempFilter = fillFilter();
    setFilter(tempFilter);
    getProducts(tempFilter).then();
  }, [
    categoryValues,
    priceValues,
    ratingValues,
    cityValues,
    getSearchParams,
    pagination,
  ]);

  return (
    <div className="search_container">
      <div className="search_content">
        <div className="left_content">
          <h2>Filter</h2>
          <Filter
            filterType="location"
            filterClass="filter_search"
            data={cities}
            values={cityValues}
            handleInput={handleInputLocation}
            handleDelete={handleDeleteLocationFilter}
          />
          <Filter
            filterType="category"
            filterClass="filter_search"
            data={categories}
            values={categoryValues}
            handleInput={handleInputCategory}
            handleDelete={handleDeleteCategoryFilter}
          />
          <Filter
            filterType="price"
            filterClass="filter_search"
            data={priceItems}
            values={priceValues}
            handleInput={handleInputPrice}
            handleDelete={handleDeletePriceFilter}
          />
          <Filter
            filterType="rating"
            filterClass="filter_search"
            data={[]}
            values={ratingValues}
            handleInput={handleInputRating}
            handleDelete={handleDeleteRatingFilter}
          />
          <FilterDelete
            handleDeleteAll={handleDeleteAllFilter}
          />
        </div>
        <div className="right_content" ref={innerRef}>
          <Sort
            sortType="search"
            options={sortOptions}
            values={sorting}
            handleInput={handleSort}
          />
          <ProductList
            data={products}
          />
          <Pagination
            page={pagination.page}
            totalPage={pagination.totalPage}
            setPage={handlePagination}
            innerRef={innerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
