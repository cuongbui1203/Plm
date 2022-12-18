import axios from "axios"

const getAllRoleApi = async () =>{
    try {
        const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + "/roles");
        // console.log(response);
        return response.data;
      } catch (error) {
        return { success: false, error: error.message };
      }
}

export {
    getAllRoleApi,
}