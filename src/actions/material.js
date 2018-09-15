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

const dispatchStartLoading = dispatch => () => dispatch(startLoading());

const getMaterialFromServer = ({ endpoint, id }) => () =>
  axios.get(`${MATERIALS_API_URL}/${endpoint}/${id}`);

const dispatchUnsetErrorAndReturnData = dispatch => ({ data }) =>
  dispatch(unsetError()) && data;

const dispatchSetMaterial = dispatch => data => dispatch(setMaterial(data));

const dispatchSetError = dispatch => ({ response, message }) =>
  dispatch(setError(response ? response.status.toString() : message));

const dispatchStopLoading = dispatch => () => dispatch(stopLoading());

export const getMaterial = params => dispatch =>
  Promise.resolve()
    .then(dispatchStartLoading(dispatch))
    .then(getMaterialFromServer(params))
    .then(dispatchUnsetErrorAndReturnData(dispatch))
    .then(dispatchSetMaterial(dispatch))
    .catch(dispatchSetError(dispatch))
    .finally(dispatchStopLoading(dispatch));
