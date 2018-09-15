import React, { memo } from 'react';

import Hero from '@/components/Hero';

const Error = ({ status }) => (
  <div className="main">
    <div className="main__hero">
      <Hero>
        <h1>Error {status}</h1>
      </Hero>
    </div>
  </div>
);

export default memo(Error);
