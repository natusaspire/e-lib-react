import React from 'react';
import { shallow } from 'enzyme';

import Error from '@/components/Error';

jest.mock('@/components/Hero', () => 'Hero');

describe('<Error />', () => {
  it('should render error info', () => {
    const wrapper = shallow(<Error status="404" />);

    expect(wrapper).toMatchSnapshot();
  });
});
