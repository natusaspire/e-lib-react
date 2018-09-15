import reducer from '@/reducers/materials';

jest.mock('@/constants/actionTypes/materials', () => ({
  START_LOADING: 'MATERIALS_START_LOADING',
  STOP_LOADING: 'MATERIALS_STOP_LOADING',
  SET_ERROR: 'MATERIALS_SET_ERROR',
  UNSET_ERROR: 'MATERIALS_UNSET_ERROR',
  EXPAND_MATERIALS: 'MATERIALS_EXPAND_MATERIALS',
  CLEAR_MATERIALS: 'MATERIALS_CLEAR_MATERIALS'
}));

describe('reducer', () => {
  it('should start loading when action type is "START_LOADING"', () => {
    const state = {
      loading: false,
      error: null,
      endpoint: '',
      pages: 0,
      page: 0,
      perPage: 0,
      search: '',
      order: '',
      total: 0,
      data: []
    };

    const action = { type: 'MATERIALS_START_LOADING' };

    const expectedState = {
      ...state,
      loading: true
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should stop loading when action type is "STOP_LOADING"', () => {
    const state = {
      loading: true,
      error: null,
      endpoint: '',
      pages: 0,
      page: 0,
      perPage: 0,
      search: '',
      order: '',
      total: 0,
      data: []
    };

    const action = { type: 'MATERIALS_STOP_LOADING' };

    const expectedState = {
      ...state,
      loading: false
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should set error when action type is "SET_ERROR"', () => {
    const state = {
      loading: true,
      error: null,
      endpoint: '',
      pages: 0,
      page: 0,
      perPage: 0,
      search: '',
      order: '',
      total: 0,
      data: []
    };

    const action = {
      type: 'MATERIALS_SET_ERROR',
      payload: '404'
    };

    const expectedState = {
      ...state,
      error: action.payload
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should unset error when action type is "UNSET_ERROR"', () => {
    const state = {
      loading: false,
      error: '404',
      endpoint: '',
      pages: 0,
      page: 0,
      perPage: 0,
      search: '',
      order: '',
      total: 0,
      data: []
    };

    const action = { type: 'MATERIALS_UNSET_ERROR' };

    const expectedState = {
      ...state,
      error: null
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should expand materials when action type is "EXPAND_MATERIALS"', () => {
    const state = {
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
    };

    const action = {
      type: 'MATERIALS_EXPAND_MATERIALS',
      payload: {
        endpoint: 'audio',
        pages: 1,
        page: 1,
        perPage: 3,
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
          },
          {
            id: 3,
            type: 'audio',
            title: 'Material title 3',
            url: 'audio3.mp3',
            rating: 20
          }
        ]
      }
    };

    const expectedState = {
      ...state,
      perPage: 3,
      data: [
        ...state.data,
        {
          id: 3,
          type: 'audio',
          title: 'Material title 3',
          url: 'audio3.mp3',
          rating: 20
        }
      ]
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should return initial state when action type is "CLEAR_MATERIALS"', () => {
    const state = {
      loading: false,
      error: null,
      endpoint: 'audio',
      pages: 1,
      page: 1,
      perPage: 9,
      search: '',
      order: '-rating',
      total: 2,
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
    };

    const initialState = {
      loading: false,
      error: null,
      endpoint: '',
      pages: 0,
      page: 0,
      perPage: 0,
      search: '',
      order: '',
      total: 0,
      data: []
    };

    const action = { type: 'MATERIALS_CLEAR_MATERIALS' };

    const expectedState = { ...initialState };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should return received state when action type is unknown', () => {
    const state = {
      loading: false,
      error: null,
      endpoint: '',
      pages: 0,
      page: 0,
      perPage: 0,
      search: '',
      order: '',
      total: 0,
      data: []
    };

    const action = { type: 'TYPE' };

    const expectedState = state;

    expect(reducer(state, action)).toBe(expectedState);
  });
});
