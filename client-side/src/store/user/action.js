import axios from 'axios';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from './constants';

export const getUserAction = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  const response = await axios.get('http://localhost:8000/user');

  if (response.statusText === 'OK') {
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    return response.data;
  }

  dispatch({ type: GET_USER_ERROR });
  return false;
};
