import { net } from "./axiosConfig";

const getAllProductApi = async () => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + "/products",

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
    );
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};
const getProductApi = async (id) => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + `/products/${id}`,

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
    );
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};
const getAllProductLine = async () => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + "/product-lines",

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
    );
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};
const deleteProductLineById = async (id) => {
  try {
    const response = await net.delete(
      process.env.REACT_APP_API_ENDPOINT + `/product-lines/${id}/delete`,

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
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
      data,

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
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
      process.env.REACT_APP_API_ENDPOINT + `/products/${id}/delete`,

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
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
      process.env.REACT_APP_API_ENDPOINT + `/users`,

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};

const createProductLineApi = async (data) => {
  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + `/product-lines/create`,
      data,

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};
const QuatityOnStatus = async (idProductLine, idStatus) => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT +
        `/product-lines/${idProductLine}/status/${idStatus}`,

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};
const delPlApi = async (id) => {
  try {
    const response = await net.delete(
      process.env.REACT_APP_API_ENDPOINT + `/product-lines/${id}/delete`,

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (e) {
    return { success: false, error: e };
  }
};

const banApi = async (id, data) => {
  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + `/product/${id}/ban`,
      data,

      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      }
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
  QuatityOnStatus,
  delPlApi,
  banApi,
};
