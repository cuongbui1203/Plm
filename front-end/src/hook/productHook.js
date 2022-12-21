import { getAllProductApi } from "../API/productApi";

const handleGetAllProduct = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [state,dispatch] = useStore()

  // dispatch(actions.setLoading(''))

  let response = getAllProductApi();
  // console.log(response)
  return response.data;
};

export { handleGetAllProduct };
