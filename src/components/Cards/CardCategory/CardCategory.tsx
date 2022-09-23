import React from 'react';
import './CardCategory.scss';

type CardCategoryProps = {
  data: {
    name: string;
    // slug: string;
    icon_url: string;
    // path: string;
  };
};

const CardCategory = (props: CardCategoryProps) => {
  const { data } = props;
  const iconUrl = data.icon_url;
  const {
    name,
    // slug,
    // path,
  } = data;

  const goToPath = () => {
    console.log(iconUrl);
  };

  return (
    <div
      className="card_category_container"
      onClick={goToPath}
      role="presentation"
    >
      <div className="card_category_content">
        <div className="top_content">
          <img
            className="image"
            src={iconUrl}
            alt={name}
          />
        </div>
        <p className="bottom_content">{name}</p>
      </div>
    </div>
  );
};

export default CardCategory;
