import React from 'react';
import { shallow } from 'enzyme';

import LibraryContainer from '@/containers/Library';

jest.mock('@/actions/materials', () => ({
  getMaterials: jest.fn(),
  clearMaterials: jest.fn()
}));

jest.mock('@/constants/endpoints', () => ({
  MATERIALS_TEXT_ENDPOINT: 'text'
}));

jest.mock('@/constants/orderTypes', () => ({
  MATERIALS_ORDER: {
    DATE: {
      ASC: 'date',
      DESC: '-date'
    },
    RATING: {
      ASC: 'rating',
      DESC: '-rating'
    }
  }
}));

jest.mock('@/components/Library', () => 'Library');

describe('<LibraryContainer />', () => {
  const props = {
    materials: {
      loading: false,
      error: null,
      endpoint: 'audio',
      pages: 1,
      page: 1,
      perPage: 2,
      search: '',
      order: '-rating',
      total: 5,
      data: [
        {
          id: 1,
          type: 'audio',
          title: 'Material title 1',
          url: 'audio1.mp3',
          rating: 100
        },
        {
          id: 2,
          type: 'audio',
          title: 'Material title 2',
          url: 'audio2.mp3',
          rating: 50
        }
      ]
    },
    getMaterials: jest.fn(),
    clearMaterials: jest.fn()
  };

  beforeEach(() => {
    global.document.title = '';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<LibraryContainer.WrappedComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should get materials on mount', () => {
    const params = {
      endpoint: 'text',
      page: 1,
      perPage: 36,
      search: '',
      order: '-date'
    };

    shallow(<LibraryContainer.WrappedComponent {...props} />);

    expect(props.getMaterials).toHaveBeenCalledWith(params);
  });

  it('should set text library document title on update when endpoint is "text"', () => {
    const materials = {
      ...props.materials,
      endpoint: 'text'
    };

    const title = 'Library of text';

    const wrapper = shallow(
      <LibraryContainer.WrappedComponent
        {...props}
        materials={materials}
      />
    );

    wrapper.setProps({
      materials: { ...materials }
    });

    expect(global.document.title).toBe(title);
  });

  it('should set audio library document title on update when endpoint is "audio"', () => {
    const materials = {
      ...props.materials,
      endpoint: 'audio'
    };

    const title = 'Library of audio';

    const wrapper = shallow(
      <LibraryContainer.WrappedComponent
        {...props}
        materials={materials}
      />
    );

    wrapper.setProps({
      materials: { ...materials }
    });

    expect(global.document.title).toBe(title);
  });

  it('should set video library document title on update when endpoint is "video"', () => {
    const materials = {
      ...props.materials,
      endpoint: 'video'
    };

    const title = 'Library of video';

    const wrapper = shallow(
      <LibraryContainer.WrappedComponent
        {...props}
        materials={materials}
      />
    );

    wrapper.setProps({
      materials: { ...materials }
    });

    expect(global.document.title).toBe(title);
  });

  it('should set library document title on update when endpoint does not exist', () => {
    const materials = {
      ...props.materials,
      endpoint: ''
    };

    const title = 'Library';

    const wrapper = shallow(
      <LibraryContainer.WrappedComponent
        {...props}
        materials={materials}
      />
    );

    wrapper.setProps({
      materials: { ...materials }
    });

    expect(global.document.title).toBe(title);
  });

  it('should clear materials on unmount', () => {
    const wrapper = shallow(<LibraryContainer.WrappedComponent {...props} />);

    wrapper.instance().componentWillUnmount();

    expect(props.clearMaterials).toHaveBeenCalled();
  });

  describe('getMaterials', () => {
    it('should get materials using received params', () => {
      const params = {
        endpoint: 'audio',
        page: 2,
        perPage: 9,
        search: '',
        order: 'date'
      };

      const wrapper = shallow(<LibraryContainer.WrappedComponent {...props} />);

      wrapper.instance().getMaterials(params);

      expect(props.getMaterials).toHaveBeenCalledWith(params);
    });

    it('should get materials using default params', () => {
      const params = {
        endpoint: 'text',
        page: 1,
        perPage: 36,
        search: '',
        order: '-date'
      };

      const wrapper = shallow(<LibraryContainer.WrappedComponent {...props} />);

      props.getMaterials.mockClear();

      wrapper.instance().getMaterials({});

      expect(props.getMaterials).toHaveBeenCalledWith(params);
    });
  });
});
