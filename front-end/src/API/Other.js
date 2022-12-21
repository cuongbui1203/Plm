import axios from "axios";

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
      }
    );
    return response;
  } catch (error) {
    return { success: false, error: error };
  }
};

const sendImageApi = async (data) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + "image",
      data
    );
    return response;
  } catch (error) {
    return { success: false, error: error };
  }
};

export { getAllRoleApi, getImageApi, sendImageApi };
