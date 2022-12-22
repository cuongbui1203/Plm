import axios from "axios";
import { config, net } from "./axiosConfig";

async function loginApi(data) {
  // axios.post('http://127.0.0.1:8000/api/user/login"')
  console.log(net);
  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + "/user/login",
      data
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function logoutApi() {
  try {
    net.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");

    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + "/user/logout"
    );

    console.log(response);
    return response.data;
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}

const registerApi = async (data) => {
  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + "/user/register",
      data
    );
    return response;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

const getUserApi = async () => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + "/user/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
export { loginApi, logoutApi, registerApi, getUserApi };
