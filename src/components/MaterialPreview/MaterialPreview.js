import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const getMaterialLink = (endpoint, materialId) =>
  `/materials/${endpoint}/${materialId}`;

const MaterialPreview = ({ endpoint, material, image }) => (
  <div className="grid__item card">
    <div className="card__body">
      <img
        className="card__image"
        src={image}
        alt=""
      />
    </div>
    <div className="card__footer">
      <Link
        to={getMaterialLink(endpoint, material.id)}
        className="card__link"
      >
        {material.title}
      </Link>
    </div>
  </div>
);

export default memo(MaterialPreview);
