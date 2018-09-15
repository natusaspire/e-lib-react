import React from 'react';
import { shallow } from 'enzyme';

import Navbar from '@/components/Navbar';

jest.mock('react-router-dom', () => ({ NavLink: 'NavLink' }));

describe('<Navbar />', () => {
  it('should render navbar content', () => {
    const wrapper = shallow(<Navbar />);

    expect(wrapper).toMatchSnapshot();
  });
});
