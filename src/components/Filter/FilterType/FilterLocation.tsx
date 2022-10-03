import React from 'react';
import Button from '../../Button/Button';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';

type FilterLocationProps = {
  filterClass: string;
  data: any[];
  handleInput: (cityId: number) => void;
  handleDelete: () => void;
  // handleChecked: (cityId: number) => void;
};

const FilterLocation = (props: FilterLocationProps) => {
  const {
    filterClass,
    data,
    handleInput,
    handleDelete,
    // handleChecked,
  } = props;

  const dataSlice = data.slice(0, 8);

  return (
    <div className="filter_location_container">
      <div className="filter_location_content">
        <h3 className="title">Lokasi</h3>
        <div className={`items_content ${filterClass}`}>
          {
            dataSlice.map(
              (item: any) => (
                <div
                  key={`${item.city_id}-${item.city_name}`}
                  className="location_item"
                >
                  <div
                    className={`checkbox ${item.isChecked ? 'checked' : ''}`}
                    onClick={() => handleInput(item.city_id)}
                    role="presentation"
                  >
                    {
                      React.createElement(IconCheck, { className: 'icon_checked' })
                    }
                  </div>
                  <p
                    className="name"
                    onClick={() => handleInput(item.city_id)}
                    role="presentation"
                  >
                    { item.city_name }
                  </p>
                </div>
              ),
            )
          }
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

export default FilterLocation;
