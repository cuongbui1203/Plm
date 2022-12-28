const isEmpty = (input) => {
  return input.length === 0;
};
const isEmail = (input) => {
  const patten = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return patten.test(input);
};

export { isEmail, isEmpty };
