import { LOADED, LOADING } from "../constants";

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

export { setLoading, setLoaded };
