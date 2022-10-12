import React, { useEffect, useRef, useState } from 'react';

import './ReviewInfo.scss';
import { useSearchParams } from 'react-router-dom';
import Reviews from '../../../api/reviews';
import Card from '../../../components/Cards/Card';
import ReviewFilter from './ReviewFilter';
import { REVIEW_FILTER_ITEMS } from '../../../constants/product';
import Pagination from '../../../components/Pagination/Pagination';
import Sort from '../../../components/Sort/Sort';
import { SORT_REVIEWS } from '../../../constants/sort';

type ReviewInfoProps = {
  productId: number,
};

const ReviewInfo = (props: ReviewInfoProps) => {
  const {
    productId,
  } = props;

  const [reviews, setReviews] = useState<any>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });
  const [, setFilter] = useState('');
  const [totalFilter, setTotalFilter] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const [sorting, setSorting] = useState('');

  const sortOptions = SORT_REVIEWS;

  const innerRef = useRef(null);

  const splitReview = (review: any) => ({
    name: review.username,
    rating: review.rating,
    createdAt: review.created_at,
    avatarUrl: review.avatar_url,
    description: review.description,
    imgUrl: review.image_url,
    imgName: review.image_name,
  });

  const splitFilter = (review: any) => {
    const filters = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < review.length; i += 1) {
      filters[0] += 1;
      filters[review[i].rating] += 1;
      if (review[i].description) {
        filters[6] += 1;
      }
      if (review[i].image_url) {
        filters[7] += 1;
      }
    }
    setTotalFilter(filters);
  };

  const getReviews = async (filters: string = '') => {
    setFilter(filters);
    const tempFilter = `?limit=6${filters}`;
    let rev;
    await Reviews.GetReviewsByProductID(productId, tempFilter)
      .then((resp) => {
        const result = resp.data.data;
        rev = {
          reviews: result.reviews,
          totalReviews: result.total_reviews,
          averageRating: result.average_rating,
        };
        setReviews(result.reviews);
        setPagination((prevState) => ({
          ...prevState,
          totalPage: result.total_pages,
        }));
      })
      .catch((err) => err);
    return rev;
  };

  const getReviewFilterItems = () => {
    let reviewFilterItems: any[] = REVIEW_FILTER_ITEMS;
    reviewFilterItems = reviewFilterItems.map(
      (item: any, index) => ({
        id: item.id,
        value: `${item.value} (${totalFilter[index]})`,
        filter: item.filter,
      }),
    );
    return reviewFilterItems;
  };

  const fillFilter = () => {
    let tempFilter = `&page=${pagination.page}`;
    if (selectedFilter !== '') {
      tempFilter += selectedFilter;
    }
    if (sorting !== '') {
      const sortBy = searchParams.get('sortBy');
      const sort = searchParams.get('sort');
      tempFilter += `&sortBy=${sortBy}&sort=${sort}`;
    }
    setFilter(tempFilter);
    return tempFilter;
  };

  const handlePagination = (newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));

    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  const handleFilter = (filters: string) => {
    if (selectedFilter === filters) {
      setSelectedFilter('');
    }
    if (selectedFilter !== filters) {
      setSelectedFilter(filters);
    }
    handlePagination(1);
  };

  const handleSort = (event: any) => {
    const { value } = event.target;
    setSorting(value);
    let sortBy = '';
    let sort = '';
    if (value === 'Terbaru') {
      sortBy = 'created_at';
      sort = 'desc';
    }
    if (value === 'Terlama') {
      sortBy = 'created_at';
      sort = 'asc';
    }

    if (sortBy !== '' && sort !== '') {
      searchParams.set('sortBy', sortBy);
      searchParams.set('sort', sort);
      setSearchParams(searchParams);
    }
    if (sortBy === '' || sort === '') {
      searchParams.delete('sortBy');
      searchParams.delete('sort');
    }
    handlePagination(1);
  };

  useEffect(() => {
    const start = async () => {
      await getReviews().then((res: any) => {
        splitFilter(res.reviews);
        setTotalReviews(res.totalReviews);
        setAverageRating(res.averageRating);
      });
    };
    start().then();
  }, []);

  useEffect(() => {
    const tempFilter = fillFilter();
    getReviews(tempFilter).then();
  }, [
    selectedFilter,
    sorting,
    pagination.page,
  ]);

  return (
    <div className="review_info_container">
      <div className="review_info_content" ref={innerRef}>
        <div className="header">
          <div className="top_content">
            <h3 className="title">PENILAIAN PRODUK</h3>
            <Sort
              sortType="search"
              options={sortOptions}
              values={sorting}
              handleInput={handleSort}
            />
          </div>
          <ReviewFilter
            items={getReviewFilterItems()}
            value={selectedFilter}
            rating={averageRating}
            totalReviewer={totalReviews}
            handleFilter={handleFilter}
          />
        </div>
        <div className="items">
          {
            reviews.length > 0
            && (
              reviews.map(
                (item: any) => (
                  <Card
                    key={`${item.id}-${item.username}`}
                    data={splitReview(item)}
                    cardType="review"
                  />
                ),
              )
            )
          }
        </div>
        <Pagination
          page={pagination.page}
          totalPage={pagination.totalPage}
          setPage={handlePagination}
          innerRef={innerRef}
        />
      </div>
    </div>
  );
};

export default ReviewInfo;
