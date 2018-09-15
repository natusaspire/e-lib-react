import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from '@/components/Toolbar';

describe('<Toolbar />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Toolbar title="Toolbar">
        <div>Tools</div>
      </Toolbar>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
