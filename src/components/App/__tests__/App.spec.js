import React from 'react';
import { shallow } from 'enzyme';

import App from '@/components/App';

jest.mock('@/components/Header', () => 'Header');
jest.mock('@/components/Main', () => 'Main');
jest.mock('@/components/Footer', () => 'Footer');

describe('<App />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
