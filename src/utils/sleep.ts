const sleep = (ms: number): any => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default sleep;
