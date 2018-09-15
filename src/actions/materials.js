import axios from 'axios';

import { MATERIALS_API_URL } from '@/constants/apiUrls';
import {
  START_LOADING,
  STOP_LOADING,
  SET_ERROR,
  UNSET_ERROR,
  EXPAND_MATERIALS,
  CLEAR_MATERIALS
} from '@/constants/actionTypes/materials';

export const startLoading = () => ({ type: START_LOADING });

export const stopLoading = () => ({ type: STOP_LOADING });

export const setError = error => ({
  type: SET_ERROR,
  payload: error
});

export const unsetError = () => ({ type: UNSET_ERROR });

export const expandMaterials = materials => ({
  type: EXPAND_MATERIALS,
  payload: materials
});

export const clearMaterials = () => ({ type: CLEAR_MATERIALS });

export const getMaterials = ({
  endpoint,
  page,
  perPage,
  search,
  order
}) => async (dispatch, getState) => {
  const { materials } = getState();

  if (
    materials.endpoint !== endpoint ||
    materials.search !== search ||
    materials.order !== order
  ) {
    dispatch(clearMaterials());
  }

  const url = `${MATERIALS_API_URL}/${endpoint}`;

  dispatch(startLoading());

  try {
    const { data: materials } = await axios.get(url, {
      params: { page, perPage, search, order }
    });

    dispatch(unsetError());

    if (materials.data.length) {
      dispatch(expandMaterials({ ...materials, endpoint }));
    } else {
      dispatch(clearMaterials());
    }
  } catch (error) {
    if (error.response) {
      dispatch(setError(error.response.status.toString()));
    } else {
      dispatch(setError(error.message));
    }
  } finally {
    dispatch(stopLoading());
  }
};
