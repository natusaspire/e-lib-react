import axios from 'axios';

import { MATERIALS_API_URL } from '@/constants/apiUrls';
import {
  START_LOADING,
  STOP_LOADING,
  SET_ERROR,
  UNSET_ERROR,
  SET_MATERIAL,
  UNSET_MATERIAL
} from '@/constants/actionTypes/material';

export const startLoading = () => ({ type: START_LOADING });

export const stopLoading = () => ({ type: STOP_LOADING });

export const setError = error => ({
  type: SET_ERROR,
  payload: error
});

export const unsetError = () => ({ type: UNSET_ERROR });

export const setMaterial = material => ({
  type: SET_MATERIAL,
  payload: material
});

export const unsetMaterial = () => ({ type: UNSET_MATERIAL });

export const getMaterial = ({ endpoint, id }) => async dispatch => {
  const url = `${MATERIALS_API_URL}/${endpoint}/${id}`;

  dispatch(startLoading());

  try {
    const { data: material } = await axios.get(url);

    dispatch(unsetError());

    dispatch(setMaterial(material));
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
