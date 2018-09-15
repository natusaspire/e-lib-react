import React from 'react';
import { shallow } from 'enzyme';

import MaterialAudio from '@/components/MaterialAudio';

describe('<MaterialAudio />', () => {
  it('should render audio material', () => {
    const material = {
      id: 1,
      type: 'audio',
      title: 'Material title',
      url: 'audio.mp3'
    };

    const wrapper = shallow(<MaterialAudio material={material} />);

    expect(wrapper).toMatchSnapshot();
  });
});
