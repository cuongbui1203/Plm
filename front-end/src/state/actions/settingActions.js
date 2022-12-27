import { LOADED, LOADING, SET_CREATE } from "../constants";

const setLoading = () => {
  return {
    type: LOADING,
  };
};

const setLoaded = () => {
  return {
    type: LOADED,
  };
};

const setCreate = (payload) => {
  return {
    type: SET_CREATE,
    data: payload,
  };
};

export { setLoading, setLoaded, setCreate };
