import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleTypeMySuffix, defaultValue } from 'app/shared/model/vehicle-type-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_VEHICLETYPE_LIST: 'vehicleType/FETCH_VEHICLETYPE_LIST',
  FETCH_VEHICLETYPE: 'vehicleType/FETCH_VEHICLETYPE',
  CREATE_VEHICLETYPE: 'vehicleType/CREATE_VEHICLETYPE',
  UPDATE_VEHICLETYPE: 'vehicleType/UPDATE_VEHICLETYPE',
  PARTIAL_UPDATE_VEHICLETYPE: 'vehicleType/PARTIAL_UPDATE_VEHICLETYPE',
  DELETE_VEHICLETYPE: 'vehicleType/DELETE_VEHICLETYPE',
  RESET: 'vehicleType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleTypeMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleTypeMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleTypeMySuffixState = initialState, action): VehicleTypeMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLETYPE):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLETYPE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLETYPE):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLETYPE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLETYPE):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLETYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLETYPE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/vehicle-types';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleTypeMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLETYPE_LIST,
  payload: axios.get<IVehicleTypeMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleTypeMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLETYPE,
    payload: axios.get<IVehicleTypeMySuffix>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleTypeMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleTypeMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLETYPE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleTypeMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLETYPE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleTypeMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLETYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
