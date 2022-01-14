const generateRandomHexId = (length = 4): string =>
  (Math.random() * 16 ** length).toString(16);

export default generateRandomHexId;
