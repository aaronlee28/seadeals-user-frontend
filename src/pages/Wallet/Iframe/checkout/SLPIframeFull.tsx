import React, { FC } from 'react';

interface SLPIFrameProps {
  url:string
}
// render kalo udah post request pay with SLP
const SLPIframeFull:FC<SLPIFrameProps> = ({ url }) => (
  <iframe
    id="spay-iframe"
    title="SeaLabs Pay"
    src={url}
    className="w-100 h-100"
  />
);

export default SLPIframeFull;
