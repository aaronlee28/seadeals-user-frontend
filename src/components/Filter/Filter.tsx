import React from 'react';
import FilterCategory from './FilterType/FilterCategory';

import './Filter.scss';
import FilterPrice from './FilterType/FilterPrice';

type FilterProps = {
  filterType: string;
  filterClass: string;
  data: any[];
  values: any;
  handleInput: (event: any) => void;
};

const Filter = (props: FilterProps) => {
  const {
    filterType,
    filterClass,
    data,
    values,
    handleInput,
  } = props;

  return (
    <div className="filter_container">
      <div className="filter_content">
        {
          filterType === 'category'
          && (
            <FilterCategory
              filterClass={filterClass}
              data={data}
              values={values}
              handleInput={handleInput}
            />
          )
        }
        {
          filterType === 'price'
          && (
            <FilterPrice
              filterClass={filterClass}
              data={data}
              values={values}
              handleInput={handleInput}
            />
          )
        }
      </div>
    </div>
  );
};

export default Filter;
