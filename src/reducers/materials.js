import {
  START_LOADING,
  STOP_LOADING,
  SET_ERROR,
  UNSET_ERROR,
  EXPAND_MATERIALS,
  CLEAR_MATERIALS
} from '@/constants/actionTypes/materials';

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

const getNewMaterialsData = (materials, stateMaterials) => {
  return materials.filter(newMaterial => {
    return stateMaterials.every(material => {
      return newMaterial.id !== material.id;
    });
  });
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
    case EXPAND_MATERIALS:
      return {
        ...state,
        ...action.payload,
        data: [
          ...state.data,
          ...getNewMaterialsData(action.payload.data, state.data)
        ]
      };
    case CLEAR_MATERIALS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
