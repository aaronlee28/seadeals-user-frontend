import React from 'react';
import Form from '../../Form/Form';

type FilterCategoryProps = {
  filterClass: string;
  data: any[];
  values: any;
  handleInput: (event: any) => void;
};

const FilterCategory = (props: FilterCategoryProps) => {
  const {
    filterClass,
    data,
    values,
    handleInput,
  } = props;

  return (
    <div className="filter_category_container">
      <div className="filter_category_content">
        <h3 className="title">Kategori</h3>
        <div className={`items_content ${filterClass}`}>
          <Form
            formType="checkbox"
            items={data}
            values={values}
            handleInput={handleInput}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;
