import axios from "axios";
import { useLoginContext } from "../state/hook/hooks";
import { net } from "./axiosConfig";

const getAllRoleApi = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + "/roles"
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};
const getImageApi = async (id) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/image/get/${id}`,
      {
        responseType: "blob",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    // console.log(response);
    return response;
  } catch (error) {
    return { success: false, error: error };
  }
};

const sendImageApi = async (data) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + "/image",
      data
    );
    return response;
  } catch (error) {
    return { success: false, error: error };
  }
};

const getRoleId = async (id) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/roles/${id}`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

const getAllWorkPlatesApi = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/work-plates`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};
const getWorkPlatesApi = async (idRole) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_ENDPOINT + `/work-plates/role/${idRole}`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    return { success: false, error: error };
  }
};

const createWorkPlateApi = async (data) => {
  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + "/work-plate/create",
      data,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

const getWorkPlatesByIdApi = async (id) => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + `/work-plate/${id}`,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

const delWpApi = async (id) => {
  try {
    const response = await net.delete(
      process.env.REACT_APP_API_ENDPOINT + `/work-plate/${id}/delete`,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

const createRequestApi = async (data) => {
  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + `/request/create`,
      data,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
const getRequest = async (id) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + `/request/user/${id}`,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

const getRequestId = async (id) => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + `/request/${id}`,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

const handleRequestApi = async () => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + `/request/`,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
const updateRequestApi = async (id, data) => {
  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + `/request/${id}/update`,
      data,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

const deleteRequestApi = async (id) => {
  try {
    const response = await net.delete(
      process.env.REACT_APP_API_ENDPOINT + `/request/${id}/delete`,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
export {
  getAllRoleApi,
  getImageApi,
  sendImageApi,
  getRoleId,
  getAllWorkPlatesApi,
  getWorkPlatesApi,
  createWorkPlateApi,
  getWorkPlatesByIdApi,
  delWpApi,
  createRequestApi,
  getRequest,
  getRequestId,
  handleRequestApi,
  updateRequestApi,
  deleteRequestApi,
};
