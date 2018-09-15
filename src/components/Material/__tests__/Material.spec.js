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
  const props = {
    match: {
      params: {
        endpoint: 'audio',
        id: '1'
      }
    },
    material: {
      loading: false,
      error: null,
      data: {
        id: 1,
        type: 'audio',
        title: 'Material title',
        url: 'audio.mp3'
      }
    },
    getMaterial: jest.fn(),
    unsetMaterial: jest.fn()
  };

  beforeEach(() => {
    global.document.title = '';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render text material when data exists and data type is text', () => {
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

    const wrapper = shallow(<Material {...props} material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render audio material when data exists and data type is audio', () => {
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

    const wrapper = shallow(<Material {...props} material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render video material when data exists and data type is video', () => {
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

    const wrapper = shallow(<Material {...props} material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render material type wrapper when data exists and data type is unknown', () => {
    const material = {
      data: {
        id: 1,
        type: 'type',
        title: 'Material title',
        url: 'video.mp4'
      },
      loading: false,
      error: null
    };

    const wrapper = shallow(<Material {...props} material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render material type wrapper when data does not exist', () => {
    const material = {
      data: null,
      loading: true,
      error: null
    };

    const wrapper = shallow(<Material {...props} material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render error content when error', () => {
    const material = {
      data: null,
      loading: false,
      error: '404'
    };

    const wrapper = shallow(<Material {...props} material={material} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should get material on mount', () => {
    shallow(<Material {...props} />);

    expect(props.getMaterial).toHaveBeenCalledWith(props.match.params);
  });

  it('should change document title on update when material data exists', () => {
    const material = {
      ...props.material,
      data: null
    };

    const wrapper = shallow(<Material {...props} material={material} />);

    wrapper.setProps({ material: props.material });

    expect(global.document.title).toBe(props.material.data.title);
  });

  it('should not change document title on update when material data does not exist', () => {
    const material = {
      ...props.material,
      data: null
    };

    const wrapper = shallow(<Material {...props} material={material} />);

    wrapper.setProps({
      material: { ...material }
    });

    expect(global.document.title).toBe('');
  });

  it('should unset material on unmount', () => {
    const wrapper = shallow(<Material {...props} />);

    wrapper.instance().componentWillUnmount();

    expect(props.unsetMaterial).toHaveBeenCalled();
  });
});
