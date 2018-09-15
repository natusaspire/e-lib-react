import React from 'react';
import { shallow } from 'enzyme';

import Hero from '@/components/Hero';

describe('<Hero />', () => {
  it('should render correctly with image url', () => {
    const wrapper = shallow(
      <Hero imageUrl="image.jpeg">
        <h1>Hero</h1>
      </Hero>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly without image url', () => {
    const wrapper = shallow(
      <Hero>
        <h1>Hero</h1>
      </Hero>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
