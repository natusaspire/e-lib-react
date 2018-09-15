import React, { memo } from 'react';

const getStyle = imageUrl => ({ backgroundImage: `url(${imageUrl})` });

const Hero = ({ children, imageUrl = '' }) => (
  <div className="hero">
    <div
      className="hero__image"
      style={getStyle(imageUrl)}
    >
      {children}
    </div>
  </div>
);

export default memo(Hero);
