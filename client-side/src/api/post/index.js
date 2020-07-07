import axios from 'axios';

export const createPost = async (data) => {
  const response = await axios.post('http://localhost:8000/posts', {
    data,
  });

  return response.data;
};

export const likePost = async (id) => {
  const response = await axios.get(`http://localhost:8000/post/${id}/like`);

  return response.data;
};
