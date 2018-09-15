import React, { memo } from 'react';

const Toolbar = ({ title, children }) => (
  <div className="toolbar">
    <div className="toolbar__body">
      <input type="checkbox" id="toolbar-toggle" />
      <label htmlFor="toolbar-toggle">
        <div className="toolbar__title">
          <span>{title}</span>
          <i className="material-icons">&#xE313;</i>
        </div>
      </label>
      <div className="toolbar__dropdown">{children}</div>
    </div>
  </div>
);

export default memo(Toolbar);
