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

const atLeastOneParamChanged = (oldParams, params) => () =>
  oldParams.endpoint !== params.endpoint ||
  oldParams.search !== params.search ||
  oldParams.order !== params.order;

const dispatchClearMaterialsIf = dispatch => condition =>
  condition && dispatch(clearMaterials());

const dispatchStartLoading = dispatch => () => dispatch(startLoading());

const getMaterialsFromServer = ({ endpoint, ...params }) => () =>
  axios.get(`${MATERIALS_API_URL}/${endpoint}`, { params });

const dispatchUnsetErrorAndReturnData = dispatch => ({ data }) =>
  dispatch(unsetError()) && data;

const dispatchExpandOrClearMaterials = (dispatch, endpoint) => data =>
  data.data.length
    ? dispatch(expandMaterials({ ...data, endpoint }))
    : dispatch(clearMaterials());

const dispatchSetError = dispatch => ({ response, message }) =>
  dispatch(setError(response ? response.status.toString() : message));

const dispatchStopLoading = dispatch => () => dispatch(stopLoading());

export const getMaterials = params => (dispatch, getState) =>
  Promise.resolve()
    .then(atLeastOneParamChanged(getState().materials, params))
    .then(dispatchClearMaterialsIf(dispatch))
    .then(dispatchStartLoading(dispatch))
    .then(getMaterialsFromServer(params))
    .then(dispatchUnsetErrorAndReturnData(dispatch))
    .then(dispatchExpandOrClearMaterials(dispatch, params.endpoint))
    .catch(dispatchSetError(dispatch))
    .finally(dispatchStopLoading(dispatch));
