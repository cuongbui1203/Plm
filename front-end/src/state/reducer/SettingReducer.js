import { LOADED, LOADING, SET_CREATE } from "../constants";

const initState = {
  isLoading: false,
  create: "",
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
    case SET_CREATE:
      return {
        ...state,
        create: action.data,
      };
    default:
      throw new Error("Invalid Update Setting Action");
  }
};

export default updateSettingState;
export { initState };
