import React from 'react';
import { shallow } from 'enzyme';

import Main from '@/components/Main';

jest.mock('react-router-dom', () => ({ Switch: 'Switch', Route: 'Route' }));

jest.mock('@/components/Home', () => 'Home');
jest.mock('@/containers/Library', () => 'LibraryContainer');
jest.mock('@/containers/Material', () => 'MaterialContainer');
jest.mock('@/components/Error', () => 'Error');

describe('<Main />', () => {
  it('should render main content', () => {
    const wrapper = shallow(<Main />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render not found error when path is unknown', () => {
    const wrapper = shallow(<Main />);

    const error = wrapper
      .find('Route')
      .at(3)
      .props()
      .render();

    expect(error).toMatchSnapshot();
  });
});
