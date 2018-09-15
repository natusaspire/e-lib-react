import React, { memo } from 'react';

const MaterialVideo = ({ material }) => (
  <div className="card">
    <div className="card__header">{material.title}</div>
    <div className="content">
      <div className="card__player">
        <video
          controls
          src={material.url}
        >Sorry, your browser does not support embedded video, you can <b><a className="card__link" href={material.url}>download</a></b> it.</video>
      </div>
    </div>
  </div>
);

export default memo(MaterialVideo);
