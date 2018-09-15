import React from 'react';
import { shallow } from 'enzyme';

import MaterialContainer from '@/containers/Material';

jest.mock('@/actions/material', () => ({
  getMaterial: jest.fn(),
  unsetMaterial: jest.fn()
}));

jest.mock('@/components/Material', () => 'Material');

describe('<MaterialContainer />', () => {
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

  it('should render correctly', () => {
    const wrapper = shallow(<MaterialContainer.WrappedComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should get material on mount', () => {
    shallow(<MaterialContainer.WrappedComponent {...props} />);

    expect(props.getMaterial).toHaveBeenCalledWith(props.match.params);
  });

  it('should change document title on update when material data exists', () => {
    const material = {
      ...props.material,
      data: null
    };

    const wrapper = shallow(
      <MaterialContainer.WrappedComponent
        {...props}
        material={material}
      />
    );

    wrapper.setProps({ material: props.material });

    expect(global.document.title).toBe(props.material.data.title);
  });

  it('should not change document title on update when material data does not exist', () => {
    const material = {
      ...props.material,
      data: null
    };

    const wrapper = shallow(
      <MaterialContainer.WrappedComponent
        {...props}
        material={material}
      />
    );

    wrapper.setProps({
      material: { ...material }
    });

    expect(global.document.title).toBe('');
  });

  it('should unset material on unmount', () => {
    const wrapper = shallow(<MaterialContainer.WrappedComponent {...props} />);

    wrapper.instance().componentWillUnmount();

    expect(props.unsetMaterial).toHaveBeenCalled();
  });
});
