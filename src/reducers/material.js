import {
  START_LOADING,
  STOP_LOADING,
  SET_ERROR,
  UNSET_ERROR,
  SET_MATERIAL,
  UNSET_MATERIAL
} from '@/constants/actionTypes/material';

const initialState = {
  loading: false,
  error: null,
  data: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UNSET_ERROR:
      return {
        ...state,
        error: null
      };
    case SET_MATERIAL:
      return {
        ...state,
        data: action.payload
      };
    case UNSET_MATERIAL:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
