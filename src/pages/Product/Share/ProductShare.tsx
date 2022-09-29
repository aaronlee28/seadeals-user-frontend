import React, { FC } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';
import ClickToCopy from '../../../components/Button/ClickToCopy';
import link from '../../../assets/svg/icon_link.svg';

const ProductShare:FC<any> = ({ url, text = 'Cek produk ini yuk!' }) => (
  <div className="d-flex gap-2 pt-3 fs-5 align-items-center">
    <p className="mb-0">Bagikan:</p>
    <FacebookMessengerShareButton
      url={url}
      appId=""
    >
      <FacebookMessengerIcon size={28} round />
    </FacebookMessengerShareButton>
    <FacebookShareButton
      url={url}
      quote={text}
    >
      <FacebookIcon size={28} round />
    </FacebookShareButton>
    <WhatsappShareButton
      url={url}
      title={text}
      separator=":: "
    >
      <WhatsappIcon size={28} round />
    </WhatsappShareButton>
    <TwitterShareButton
      url={url}
      title={text}
    >
      <TwitterIcon size={28} round />
    </TwitterShareButton>
    <ClickToCopy text={`${text} ${url}`}>
      <img src={link} alt="share" className="mx-auto" style={{ height: '75%', width: '75%' }} />
    </ClickToCopy>
  </div>
);

export default ProductShare;
