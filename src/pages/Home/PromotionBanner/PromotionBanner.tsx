import React, { useState } from 'react';

import banner1 from '../../../assets/png/promotion_banner.png';
import banner2 from '../../../assets/png/promotion_banner_2.png';
import banner3 from '../../../assets/png/promotion_banner_3.png';

import './PromotionBanner.scss';

const PromotionBanner = () => {
  const [counter, setCounter] = useState(0);

  const handleInd1 = () => {
    setCounter(0);
  };

  const handleInd2 = () => {
    setCounter(1);
  };

  const handleInd3 = () => {
    setCounter(2);
  };

  return (
    <div className="promotion_container row justify-content-center">
      <div className="banner_container col-12" style={{ textAlign: 'center' }}>
        <div id="carouselExampleControls" className="d-flex mx-auto carousel slide justify-content-center" data-ride="carousel">
          <ol className="carousel-indicators">
            <li className={counter === 0 ? 'active' : ''} onClick={handleInd1} />
            <li className={counter === 1 ? 'active' : ''} onClick={handleInd2} />
            <li className={counter === 2 ? 'active' : ''} onClick={handleInd3} />
          </ol>
          <div className="carousel-inner">
            <div className={counter === 0 ? 'carousel-item active' : 'carousel-item'}>
              <a href="/">
                <img
                  className="d-block img-fluid mx-auto"
                  src={banner1}
                  alt="First slide"
                />
              </a>
            </div>
            <div className={counter === 1 ? 'carousel-item active' : 'carousel-item'}>
              <a href="/">
                <img
                  className="d-block img-fluid mx-auto"
                  src={banner2}
                  alt="Second slide"
                />
              </a>
            </div>
            <div className={counter === 2 ? 'carousel-item active' : 'carousel-item'}>
              <a href="/">
                <img
                  className="d-block img-fluid mx-auto"
                  src={banner3}
                  alt="Third slide"
                />
              </a>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
