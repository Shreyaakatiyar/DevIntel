import axios from "axios";

const BASE_URL = "https://api.github.com";

export const getUser = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response;
};

export const getRepos = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}/repos?per_page=100`);
  return response;
};