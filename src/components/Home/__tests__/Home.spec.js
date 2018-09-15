import React from 'react';
import { shallow } from 'enzyme';

import Home from '@/components/Home';

jest.mock('@/components/Hero', () => 'Hero');
jest.mock('@/assets/hero.jpeg', () => 'hero.jpeg');

describe('<Home />', () => {
  beforeEach(() => {
    global.document.title = '';
  });

  it('should render home content', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should change document title on mount', () => {
    const title = 'E-lib';

    shallow(<Home />);

    expect(global.document.title).toBe(title);
  });
});
