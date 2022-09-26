import React from 'react';
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
import ClickToCopy from '../../components/Button/ClickToCopy';

const ProductShare = () => (
  <div>
    <FacebookMessengerShareButton
      url="https://github.com/next-share"
      appId=""
    >
      <FacebookMessengerIcon size={32} round />
    </FacebookMessengerShareButton>
    <FacebookShareButton
      url="https://github.com/next-share"
      quote="next-share is a social share buttons for your next React apps."
      hashtag="#nextshare"
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <WhatsappShareButton
      url="https://github.com/next-share"
      title="next-share is a social share buttons for your next React apps."
      separator=":: "
    >
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
    <TwitterShareButton
      url="https://github.com/next-share"
      title="next-share is a social share buttons for your next React apps."
    >
      <TwitterIcon size={32} round />
    </TwitterShareButton>
    <ClickToCopy text="copy!">
      <div>Click to Copy</div>
    </ClickToCopy>
  </div>
);

export default ProductShare;
