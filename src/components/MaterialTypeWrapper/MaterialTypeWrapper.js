import React, { memo } from 'react';

const MaterialTypeWrapper = ({ children }) => (
  <div className="main">
    <div className="main__container main__detail-content">{children}</div>
  </div>
);

export default memo(MaterialTypeWrapper);
