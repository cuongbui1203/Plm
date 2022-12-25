import { SET, SET_PRODUCT_LINE_IMAGE } from "../constants";

const initState = {
  data: [],
};

const UpdateDataState = (state, action) => {
  switch (action.type) {
    case SET_PRODUCT_LINE_IMAGE:
      state.data.push(action.data);
      return {
        ...state,
      };
    case SET:
      return {
        data: action.data,
      };
    default:
      throw new Error("Invalid Add Product Line Image");
  }
};

export { initState };
export default UpdateDataState;
