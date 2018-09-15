import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const getMaterialLink = (endpoint, materialId) =>
  `/materials/${endpoint}/${materialId}`;

const MaterialPreview = ({ endpoint, material, image }) => (
  <div className="card">
    <div className="card__body">
      <img className="card__image" src={image} alt="" />
    </div>
    <div className="card__footer">
      <Link className="card__link" to={getMaterialLink(endpoint, material.id)}>
        {material.title}
      </Link>
    </div>
  </div>
);

export default memo(MaterialPreview);
