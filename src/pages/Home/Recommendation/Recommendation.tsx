import React from 'react';

import './Recommendation.scss';
import Card from '../../../components/Cards/Card';
import Button from '../../../components/Button/Button';

type RecommendationProps = {
  data: any[];
};

const Recommendation = (props: RecommendationProps) => {
  const { data } = props;

  const goToSearchPage = () => {
    console.log('SEARCH');
  };

  return (
    <div className="recommendation_container">
      <div className="recommendation_content">
        <div className="header">
          <h3 className="title">Rekomendasi</h3>
        </div>
        <div className="items_content">
          {
            data.map(
              (item) => (
                <Card
                  key={`${item.name}`}
                  data={item}
                  cardType="product-list"
                />
              ),
            )
          }
        </div>
        <Button
          buttonType="primary alt show_all"
          text="Lihat Semua"
          handleClickedButton={goToSearchPage}
        />
      </div>
    </div>
  );
};

export default Recommendation;
