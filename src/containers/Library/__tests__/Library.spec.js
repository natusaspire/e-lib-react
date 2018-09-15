import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import LibraryContainer from '@/containers/Library';

jest.mock('@/actions/materials', () => ({
  getMaterials: jest.fn(),
  clearMaterials: jest.fn()
}));

jest.mock('@/components/Library', () => 'Library');

const configureMockStore = configureStore();

const initialState = {
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
  }
};

const store = configureMockStore(initialState);

describe('<LibraryContainer />', () => {
  it('should render library container', () => {
    const wrapper = shallow(<LibraryContainer store={store} />);

    expect(wrapper).toMatchSnapshot();
  });
});
