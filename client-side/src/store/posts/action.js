import axios from 'axios';
import {
  GET_POSTS_ERROR,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  UPDATE_POST_LIKE,
  UPDATE_WITH_NEW_POST,
} from './constants';

export const getPostsAction = () => async (dispatch) => {
  dispatch({ type: GET_POSTS_REQUEST });

  const response = await axios.get('http://localhost:8000/posts');

  if (response.statusText === 'OK') {
    dispatch({ type: GET_POSTS_SUCCESS, payload: response.data });
    return response.data;
  }

  dispatch({ type: GET_POSTS_ERROR });
  return false;
};

export const updatePostAction = (resp, type, id) => async (dispatch) => {
  switch (type) {
    case 'create':
      dispatch({ type: UPDATE_WITH_NEW_POST, payload: resp });
      break;
    case 'like':
      dispatch({ type: UPDATE_POST_LIKE, payload: { id, count: resp.count } });
      break;
    default:
  }
};
