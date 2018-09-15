import React from 'react';
import { shallow } from 'enzyme';

import Library from '@/components/Library';

jest.mock('@/constants/endpoints', () => ({
  MATERIALS_TEXT_ENDPOINT: 'text',
  MATERIALS_AUDIO_ENDPOINT: 'audio',
  MATERIALS_VIDEO_ENDPOINT: 'video'
}));

jest.mock('@/components/Toolbar', () => 'Toolbar');
jest.mock('@/components/Tabs', () => 'Tabs');
jest.mock('@/components/MaterialPreviewList', () => 'MaterialPreviewList');

describe('<Library />', () => {
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
    ],
    onUpdate: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render library content', () => {
    const wrapper = shallow(<Library {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('selectTabItem', () => {
    it('should update endpoint', () => {
      const wrapper = shallow(<Library {...props} />);

      const tab = {
        id: 2,
        name: 'Audio',
        value: 'audio'
      };

      const params = { endpoint: tab.value };

      wrapper.instance().selectTabItem(tab);

      expect(props.onUpdate).toHaveBeenCalledWith(params);
    });
  });
});
