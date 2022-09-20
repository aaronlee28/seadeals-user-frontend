import React from 'react';

type CardCategoryProps = {
  data: {
    name: string;
    imgUrl: string;
  };
};

const CardCategory = (props: CardCategoryProps) => {
  const { data } = props;
  const {
    name,
    imgUrl,
  } = data;

  return (
    <div className="card_category_container">
      <div className="card_category_content">
        <div className="top_content">
          <img
            className="image"
            src={imgUrl}
            alt={name}
          />
        </div>
        <p className="bottom_content">{name}</p>
      </div>
    </div>
  );
};

export default CardCategory;
