import { SET, SET_PRODUCT_LINE_IMAGE } from "../constants";

const setImageUrlPL = (productId, url) => {
  let ojb = {
    productId: productId,
    img: url,
  };
  const res = {
    type: SET_PRODUCT_LINE_IMAGE,
    data: ojb,
  };
  //   console.log(res);
  return res;
};

const setProduct = (paload) => {
  return {
    type: SET,
    data: paload,
  };
};

export { setImageUrlPL, setProduct };
