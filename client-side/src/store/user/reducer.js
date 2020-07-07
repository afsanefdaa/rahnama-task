import {
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from './constants';

const initialState = {
  loading: false,
  data: null,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state, loading: true, data: null, error: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state, loading: false, data: action.payload, error: false,
      };
    case GET_USER_ERROR:
      return {
        ...state, loading: false, data: null, error: true,
      };

    default:
      return state;
  }
};
