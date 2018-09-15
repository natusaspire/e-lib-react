import React, { memo } from 'react';

const MaterialText = ({ material }) => (
  <div className="card">
    <div className="card__header">{material.title}</div>
    <div className="content">
      <span>{material.textContent}</span>
    </div>
  </div>
);

export default memo(MaterialText);
