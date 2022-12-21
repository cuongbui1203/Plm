import { LOADED, LOADING } from "../constants";

const initState = {
  isLoading: false,
};

const updateSettingState = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOADED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error("Invalid Action");
  }
};

export default updateSettingState;
export { initState };
