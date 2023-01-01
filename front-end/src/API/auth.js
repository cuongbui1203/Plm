import { net } from "./axiosConfig";

async function loginApi(data) {
  // axios.post('http://127.0.0.1:8000/api/user/login"')
  console.log(net);
  net.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + "/user/login",
      data,
      {
        headers: {
          accept: "application/json",
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
  } catch (error) {
    return { success: false, error: error.message };
  }
}
async function ChangePassApi(id, data) {
  // axios.post('http://127.0.0.1:8000/api/user/login"')
  console.log(net);
  net.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

  try {
    const response = await net.post(
      process.env.REACT_APP_API_ENDPOINT + `/user/${id}/change`,
      data,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          accept: "application/json",
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
  } catch (error) {
    return { success: false, error: error };
  }
}

async function logoutApi() {
  try {
    net.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");

    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + "/user/logout",

      {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem("token"),
          accept: "application/json",
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
      data,
      {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
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

const getUserApi = async () => {
  try {
    const response = await net.get(
      process.env.REACT_APP_API_ENDPOINT + "/user/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
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
export { loginApi, logoutApi, registerApi, getUserApi, ChangePassApi };
