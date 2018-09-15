import React from 'react';
import { shallow } from 'enzyme';

import MaterialTypeWrapper from '@/components/MaterialTypeWrapper';

describe('<MaterialTypeWrapper />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <MaterialTypeWrapper>
        <div>MaterialType</div>
      </MaterialTypeWrapper>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
