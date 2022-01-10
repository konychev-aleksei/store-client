import axios from "axios";
import C from "../constants";

const getToken = () => {
  return window.sessionStorage.getItem("auth");
};

const request = async (url, method, data) => {
  const response = await axios({
    url: `${C.BASE_URL}${url}`,
    method,
    data,
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  return response.data;
};

export const createUser = async (name) => {
  return await request(`/create-user/${name}`, C.POST, {});
};

export const querySearch = async (query) => {
  return await request(`/search/${query}`, C.GET, {});
};

export const getOrders = async (name) => {
  return await request(`/get-orders/${name}`, C.GET, {});
};

export const getOrder = async (id) => {
  return await request(`/get-order/${id}`, C.GET, {});
};

export const createNewOrder = async (newOrder) => {
  return await request(`/create-order`, C.POST, newOrder);
};
