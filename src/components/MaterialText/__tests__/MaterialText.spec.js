import React from 'react';
import { shallow } from 'enzyme';

import MaterialText from '@/components/MaterialText';

describe('<MaterialText />', () => {
  it('should render text material', () => {
    const material = {
      id: 1,
      type: 'text',
      title: 'Material title',
      textContent: 'Material text content.'
    };

    const wrapper = shallow(<MaterialText material={material} />);

    expect(wrapper).toMatchSnapshot();
  });
});
