const isNumericChar = (c: number) => {
  const alphaKeys = [...Array(26).keys()].map((i) => i + 65);
  const symbolKeys = [186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222];
  const ctrKey = [65, 86, 67];
  return [...alphaKeys, ...symbolKeys, ...ctrKey].includes(c) ? false : true;
};

export default isNumericChar;
