import {
  GET_POSTS_ERROR,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  UPDATE_POST_LIKE,
  UPDATE_WITH_NEW_POST,
} from './constants';

const initialState = {
  loading: false,
  data: null,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state, loading: true, data: null, error: false,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state, loading: false, data: action.payload, error: false,
      };
    case GET_POSTS_ERROR:
      return {
        ...state, loading: false, data: null, error: true,
      };
    case UPDATE_POST_LIKE:
      return {
        ...state,
        data: state.data.map((el) => {
          if (el.id === action.payload.id) {
            return {
              ...el,
              likes: action.payload.count,
            };
          }
          return el;
        }),
      };
    case UPDATE_WITH_NEW_POST:
      return {
        ...state, data: [...state.data, action.payload],
      };
    default:
      return state;
  }
};
