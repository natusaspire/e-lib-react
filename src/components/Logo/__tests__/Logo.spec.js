import React from 'react';
import { shallow } from 'enzyme';

import Logo from '@/components/Logo';

describe('<Logo />', () => {
  it('should render logo content', () => {
    const wrapper = shallow(<Logo />);

    expect(wrapper).toMatchSnapshot();
  });
});
