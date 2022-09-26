import React from 'react';

type FilterRatingProps = {
  filterClass: string,
  data: any[],
  values: any,
  handleInput: (event: any) => void;
};

const FilterRating = (props: FilterRatingProps) => {
  const {
    filterClass,
    data,
    values,
    handleInput,
  } = props;

  return (
    <div className="filter_rating_container">
      <div className="filter_rating_content">
        <h3 className="title">Penilaian</h3>
        <div className={`items_content ${filterClass}`}>
          ...
        </div>
      </div>
    </div>
  );
};

export default FilterRating;
