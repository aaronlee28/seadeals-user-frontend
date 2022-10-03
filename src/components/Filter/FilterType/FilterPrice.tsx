import React from 'react';
import Form from '../../Form/Form';
import Button from '../../Button/Button';

type FilterPriceProps = {
  filterClass: string,
  data: any[],
  values: any,
  handleInput: (event: any) => void;
  handleDelete: () => void;
};

const FilterPrice = (props: FilterPriceProps) => {
  const {
    filterClass,
    data,
    values,
    handleInput,
    handleDelete,
  } = props;

  return (
    <div className="filter_price_container">
      <div className="filter_price_content">
        <h3 className="title">Batas Harga</h3>
        <div className={`items_content ${filterClass}`}>
          <Form
            formType="number currency"
            items={data}
            values={values}
            handleInput={handleInput}
          />
        </div>
        <Button
          buttonType="secondary"
          text="Hapus"
          handleClickedButton={handleDelete}
        />
      </div>
    </div>
  );
};

export default FilterPrice;
