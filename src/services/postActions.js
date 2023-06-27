import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAllPosts = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const editPost = (changedPost, id) => {
  return axios
    .put(`${baseUrl}/${id}`, changedPost)
    .then(response => response.data);
};

const deletePost = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
};

const createPost = newPost => {
  return axios.post(baseUrl, newPost).then(response => response.data);
};

export { getAllPosts, editPost, deletePost, createPost };
