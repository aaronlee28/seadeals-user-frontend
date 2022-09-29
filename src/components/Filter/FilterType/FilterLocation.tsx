import React, { useState } from 'react';
import Form from '../../Form/Form';

type FilterCategoryProps = {
  filterClass: string,
  data: any[],
};

const FilterCategory = (props: FilterCategoryProps) => {
  const {
    filterClass,
    data,
  } = props;

  const [categoryValues, setCategoryValues] = useState<any>([]);

  const handleInput = (event: any) => {
    const isExist = categoryValues?.includes(event.target.value);
    if (isExist) {
      const deleteValue = categoryValues.filter((el: any) => el !== event.target.value);
      setCategoryValues(deleteValue);
    }
    if (!isExist) {
      categoryValues.push(event.target.value);
      setCategoryValues(categoryValues);
    }
  };

  return (
    <div className="filter_category_container">
      <div className="filter_category_content">
        <h3 className="title">Kategori</h3>
        <div className={`items_content ${filterClass}`}>
          <Form
            formType="checkbox"
            items={data}
            values={categoryValues}
            handleInput={handleInput}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;
