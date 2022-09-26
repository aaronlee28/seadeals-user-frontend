import React from 'react';
import Form from '../../Form/Form';

type FilterPriceProps = {
  filterClass: string,
  data: any[],
  values: any,
  handleInput: (event: any) => void;
};

const FilterPrice = (props: FilterPriceProps) => {
  const {
    filterClass,
    data,
    values,
    handleInput,
  } = props;

  return (
    <div className="filter_price_container">
      <div className="filter_price_content">
        <h3 className="title">Batas Harga</h3>
        <div className={`items_content ${filterClass}`}>
          <Form
            formType="number"
            items={data}
            values={values}
            handleInput={handleInput}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPrice;
