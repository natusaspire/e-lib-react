import reducer from '@/reducers/material';

jest.mock('@/constants/actionTypes/material', () => ({
  START_LOADING: 'MATERIAL_START_LOADING',
  STOP_LOADING: 'MATERIAL_STOP_LOADING',
  SET_ERROR: 'MATERIAL_SET_ERROR',
  UNSET_ERROR: 'MATERIAL_UNSET_ERROR',
  SET_MATERIAL: 'MATERIAL_SET_MATERIAL',
  UNSET_MATERIAL: 'MATERIAL_UNSET_MATERIAL'
}));

describe('reducer', () => {
  it('should start loading when action type is "START_LOADING"', () => {
    const state = {
      loading: false,
      error: null,
      data: null
    };

    const action = { type: 'MATERIAL_START_LOADING' };

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
      data: null
    };

    const action = { type: 'MATERIAL_STOP_LOADING' };

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
      data: null
    };

    const action = {
      type: 'MATERIAL_SET_ERROR',
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
      loading: true,
      error: '404',
      data: null
    };

    const action = { type: 'MATERIAL_UNSET_ERROR' };

    const expectedState = {
      ...state,
      error: null
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should set material when action type is "SET_MATERIAL"', () => {
    const state = {
      loading: true,
      error: null,
      data: null
    };

    const action = {
      type: 'MATERIAL_SET_MATERIAL',
      payload: {
        id: 1,
        type: 'audio',
        title: 'Material title',
        url: 'audio.mp3'
      }
    };

    const expectedState = {
      ...state,
      data: action.payload
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should return initial state when action type is "UNSET_MATERIAL"', () => {
    const state = {
      loading: false,
      error: null,
      data: {
        id: 1,
        type: 'audio',
        title: 'Material title',
        url: 'audio.mp3'
      }
    };

    const initialState = {
      loading: false,
      error: null,
      data: null
    };

    const action = { type: 'MATERIAL_UNSET_MATERIAL' };

    const expectedState = { ...initialState };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should return received state when action type is unknown', () => {
    const state = {
      loading: false,
      error: null,
      data: null
    };

    const action = { type: 'TYPE' };

    const expectedState = state;

    expect(reducer(state, action)).toBe(expectedState);
  });
});
