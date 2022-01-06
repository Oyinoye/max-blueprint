import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleMySuffix, defaultValue } from 'app/shared/model/vehicle-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_VEHICLE_LIST: 'vehicle/FETCH_VEHICLE_LIST',
  FETCH_VEHICLE: 'vehicle/FETCH_VEHICLE',
  CREATE_VEHICLE: 'vehicle/CREATE_VEHICLE',
  UPDATE_VEHICLE: 'vehicle/UPDATE_VEHICLE',
  PARTIAL_UPDATE_VEHICLE: 'vehicle/PARTIAL_UPDATE_VEHICLE',
  DELETE_VEHICLE: 'vehicle/DELETE_VEHICLE',
  SET_BLOB: 'vehicle/SET_BLOB',
  RESET: 'vehicle/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleMySuffix>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type VehicleMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleMySuffixState = initialState, action): VehicleMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLE):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLE):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLE):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLE):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLE):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLE):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/vehicles';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleMySuffix> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLE_LIST,
    payload: axios.get<IVehicleMySuffix>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IVehicleMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLE,
    payload: axios.get<IVehicleMySuffix>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
