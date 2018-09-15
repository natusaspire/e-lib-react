import React from 'react';
import { shallow } from 'enzyme';

import MaterialVideo from '@/components/MaterialVideo';

describe('<MaterialVideo />', () => {
  it('should render correctly', () => {
    const material = {
      id: 1,
      type: 'video',
      title: 'Material title',
      url: 'video.mp4'
    };

    const wrapper = shallow(<MaterialVideo material={material} />);

    expect(wrapper).toMatchSnapshot();
  });
});
