import React from 'react';
import { shallow } from 'enzyme';

import Main from '@/components/Main';

jest.mock('react-router-dom', () => ({
  Switch: 'Switch',
  Route: 'Route'
}));

jest.mock('@/components/Home', () => 'Home');
jest.mock('@/containers/Library', () => 'LibraryContainer');
jest.mock('@/containers/Material', () => 'MaterialContainer');
jest.mock('@/components/Error', () => 'Error');

describe('<Main />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Main />);

    expect(wrapper).toMatchSnapshot();
  });
});
