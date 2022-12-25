import { getAllRoleApi, getImageApi } from "../API/Other";

const handleGetRoleApi = async () => {
  const response = await getAllRoleApi();
};

/**
 * Xử lý khi muốn lấy ảnh về
 * @param {integer} id Id của ảnh được gửi về từ BE
 * @returns thẻ img HTML <img>
 */
const handleGetImage = async (id) => {
  const response = await getImageApi(id);
  if (response.success) {
    return document
      .createElement("img")
      .setAttribute("src", URL.createObjectURL(response.data));
  } else {
    return null;
  }
};

const handleGetUrlImage = async (id) => {
  const response = await getImageApi(id);
  // console.log(response);
  if (response.status === 200) {
    return URL.createObjectURL(response.data);
  } else {
    return null;
  }
};

export { handleGetRoleApi, handleGetImage, handleGetUrlImage };
