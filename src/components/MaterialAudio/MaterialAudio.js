import React, { memo } from 'react';

const MaterialAudio = ({ material }) => (
  <div className="card">
    <div className="card__header">{material.title}</div>
    <div className="content">
      <div className="card__player">
        <audio controls src={material.url}>
          Sorry, your browser does not support embedded audio, you can
          {' '}
          <b>
            <a className="card__link" href={material.url}>download</a>
          </b>
          {' '}
          it.
        </audio>
      </div>
    </div>
  </div>
);

export default memo(MaterialAudio);
