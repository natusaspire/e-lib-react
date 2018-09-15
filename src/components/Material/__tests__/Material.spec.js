import React from 'react';
import { shallow } from 'enzyme';

import Material from '@/components/Material';

jest.mock('@/constants/materialTypes', () => ({
  TEXT_MATERIAL: 'text',
  AUDIO_MATERIAL: 'audio',
  VIDEO_MATERIAL: 'video'
}));

jest.mock('@/components/MaterialTypeWrapper', () => 'MaterialTypeWrapper');
jest.mock('@/components/MaterialText', () => 'MaterialText');
jest.mock('@/components/MaterialAudio', () => 'MaterialAudio');
jest.mock('@/components/MaterialVideo', () => 'MaterialVideo');
jest.mock('@/components/Error', () => 'Error');

describe('<Material />', () => {
  it('should render text material when data type is text', () => {
    const material = {
      data: {
        id: 1,
        type: 'text',
        title: 'Material title',
        textContent: 'Material text content.'
      },
      loading: false,
      error: null
    };

    const wrapper = shallow(<Material material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render audio material when data type is audio', () => {
    const material = {
      data: {
        id: 1,
        type: 'audio',
        title: 'Material title',
        url: 'audio.mp3'
      },
      loading: false,
      error: null
    };

    const wrapper = shallow(<Material material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render video material when data type is video', () => {
    const material = {
      data: {
        id: 1,
        type: 'video',
        title: 'Material title',
        url: 'video.mp4'
      },
      loading: false,
      error: null
    };

    const wrapper = shallow(<Material material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render material wrapper when loading', () => {
    const material = {
      data: null,
      loading: true,
      error: null
    };

    const wrapper = shallow(<Material material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render error content when error', () => {
    const material = {
      data: null,
      loading: false,
      error: '404'
    };

    const wrapper = shallow(<Material material={material} />);

    expect(wrapper).toMatchSnapshot();
  });
});
