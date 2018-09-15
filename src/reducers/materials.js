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

const materialIdsNotEqual = firstMaterial => secondMaterial =>
  firstMaterial.id !== secondMaterial.id;

const eachMaterialNew = materials => material =>
  materials.every(materialIdsNotEqual(material));

const getNewMaterials = (materials, oldMaterials) =>
  materials.filter(eachMaterialNew(oldMaterials));

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    case SET_ERROR:
      return { ...state, error: payload };
    case UNSET_ERROR:
      return { ...state, error: null };
    case EXPAND_MATERIALS:
      return {
        ...state,
        ...payload,
        data: [...state.data, ...getNewMaterials(payload.data, state.data)]
      };
    case CLEAR_MATERIALS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
