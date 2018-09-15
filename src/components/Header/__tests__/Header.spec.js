import React from 'react';
import { shallow } from 'enzyme';

import Header from '@/components/Header';

jest.mock('@/components/Logo', () => 'Logo');
jest.mock('@/components/Navbar', () => 'Navbar');

describe('<Header />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper).toMatchSnapshot();
  });
});
