import { getAllProductApi, getProductApi } from "../API/productApi";

const handleGetAllProduct = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [state,dispatch] = useStore()

  // dispatch(actions.setLoading(''))

  let response = await getAllProductApi();
  // console.log(response)

  if (response.success) {
  }

  return response.data;
};

let handleGetProduct = async (id) => {
  let response = await getProductApi(id);
  if (response.success) {
    return response;
  } else {
    return response;
  }
};

export { handleGetAllProduct };
