import axios from "axios";
import { net } from "./axiosConfig";

const getAllProductApi = async () => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + "/products"
    );
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};
const getProductApi = async (id) => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + `/products/${id}`
    );
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};
const getAllProductLine = async () => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + "/product-lines"
    );
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};
const deleteProductLineById = async (id) => {
  try {
    const response = await net.delete(
      process.env.REACT_APP_API_ENDPOINT + `/product-lines/${id}/delete`
    );
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};

const createProduct = async (data) => {
  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + "/products/create",
      data
    );
    console.log(response);
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};

const deleteProductApi = async (id) => {
  try {
    const response = await net.delete(
      process.env.REACT_APP_API_ENDPOINT + `/products/${id}/delete`
    );
    console.log(response);
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};

const getAllUsersApi = async () => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + `/users`
    );
    console.log(response);
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};

const createProductLineApi = async (data) => {
  try {
    const response = await net.create(
      process.env.REACT_APP_API_ENDPOINT + `/product-lines/create`,
      data
    );
    console.log(response);
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};

export {
  getAllProductApi,
  getAllProductLine,
  createProduct,
  createProductLineApi,
  getProductApi,
  deleteProductApi,
  deleteProductLineById,
  getAllUsersApi,
};
