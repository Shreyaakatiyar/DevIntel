import axios from "axios";

const BASE_URL = "https://api.github.com";

export const getUser = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};

export const getRepos = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}/repos`);
  return response.data;
};