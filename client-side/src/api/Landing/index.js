import axios from 'axios';

export const getAllPosts = async () => {
  const response = await axios.get('http://localhost:8000/posts');
  if (response.statusText === 'OK') {
    return response.data;
  }
  return false;
};
