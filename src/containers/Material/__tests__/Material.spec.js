import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import MaterialContainer from '@/containers/Material';

jest.mock('@/actions/material', () => ({
  getMaterial: jest.fn(),
  unsetMaterial: jest.fn()
}));

jest.mock('@/components/Material', () => 'Material');

const configureMockStore = configureStore();

const initialState = {
  material: {
    loading: false,
    error: null,
    data: {
      id: 1,
      type: 'audio',
      title: 'Material title',
      url: 'audio.mp3'
    }
  }
};

const store = configureMockStore(initialState);

describe('<MaterialContainer />', () => {
  it('should render material container', () => {
    const wrapper = shallow(<MaterialContainer store={store} />);

    expect(wrapper).toMatchSnapshot();
  });
});
