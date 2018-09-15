import React, { PureComponent } from 'react';

import Hero from '@/components/Hero';
import heroImage from '@/assets/hero.jpeg';

const PAGE_TITLE = 'E-lib';

class Home extends PureComponent {
  componentDidMount() {
    document.title = PAGE_TITLE;
  }

  render() {
    return (
      <div className="main">
        <div className="main__hero">
          <Hero imageUrl={heroImage} />
        </div>
      </div>
    );
  }
}

export default Home;
