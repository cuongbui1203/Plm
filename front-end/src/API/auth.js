import axios from "axios";

async function loginApi(data){
  // axios.post('http://127.0.0.1:8000/api/user/login"')
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/user/login", data);
        // console.log(response);
        return response.data;
      } catch (error) {
        return { success: false, error: error.message };
      }
}


async function logoutApi(){
  try{
    const response = await axios.post(
      'http://127.0.0.1:8000/api/user/logout',
      ''
    )
    return response;
  } catch(e){
    return {
      success:false,
      error:e
    }
  }
}

export {
  loginApi,
  logoutApi
}


