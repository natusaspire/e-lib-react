import React from 'react';
import { shallow } from 'enzyme';

import MaterialPreviewList from '@/components/MaterialPreviewList';

jest.mock('@/constants/endpoints', () => ({
  MATERIALS_TEXT_ENDPOINT: 'text',
  MATERIALS_AUDIO_ENDPOINT: 'audio',
  MATERIALS_VIDEO_ENDPOINT: 'video'
}));

jest.mock('@/components/MaterialPreview', () => 'MaterialPreview');
jest.mock('@/assets/categories/text.png', () => 'text.png');
jest.mock('@/assets/categories/audio.png', () => 'audio.png');
jest.mock('@/assets/categories/video.png', () => 'video.png');

describe('<MaterialPreviewList />', () => {
  it('should render correctly when endpoint is "text"', () => {
    const props = {
      endpoint: 'text',
      materials: [
        {
          id: 1,
          type: 'text',
          title: 'Material title 1',
          textContent: 'Material text content 1.'
        },
        {
          id: 2,
          type: 'text',
          title: 'Material title 2',
          textContent: 'Material text content 2.'
        },
        {
          id: 3,
          type: 'text',
          title: 'Material title 3',
          textContent: 'Material text content 3.'
        }
      ]
    };

    const wrapper = shallow(<MaterialPreviewList {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when endpoint is "audio"', () => {
    const props = {
      endpoint: 'audio',
      materials: [
        {
          id: 1,
          type: 'audio',
          title: 'Material title 1',
          url: 'audio1.mp3'
        },
        {
          id: 2,
          type: 'audio',
          title: 'Material title 2',
          url: 'audio2.mp3'
        },
        {
          id: 3,
          type: 'audio',
          title: 'Material title 3',
          url: 'audio3.mp3'
        }
      ]
    };

    const wrapper = shallow(<MaterialPreviewList {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when endpoint is "video"', () => {
    const props = {
      endpoint: 'video',
      materials: [
        {
          id: 1,
          type: 'video',
          title: 'Material title 1',
          url: 'video1.mp3'
        },
        {
          id: 2,
          type: 'video',
          title: 'Material title 2',
          url: 'video2.mp3'
        },
        {
          id: 3,
          type: 'video',
          title: 'Material title 3',
          url: 'video3.mp3'
        }
      ]
    };

    const wrapper = shallow(<MaterialPreviewList {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
