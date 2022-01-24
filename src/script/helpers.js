export const convertPriceNumber = (number) => {
  const beforeConvertNumberStr = String(Math.round(number) - 1);

  const numberStr = [
    beforeConvertNumberStr.slice(0, beforeConvertNumberStr.length - 3),
    "000",
  ].join("");

  let splitStr = [];

  let targetStr = numberStr,
    count = numberStr.length;

  do {
    if (targetStr.length < 4) {
      splitStr.unshift(targetStr);
      break;
    }

    targetStr = numberStr.slice(0, count - 3);

    splitStr.unshift(numberStr.slice(count - 3, count));
    count -= 3;
  } while (targetStr.length > 0);

  return splitStr.join(".");
};

export const validateInput = (inputData, type) => {
  const data = inputData.trim();

  if (data.length === 0) {
    return { isValid: false, status: "empty" };
  }

  if (type === "email") {
  }

  return { isValid: true };
};

export const calcSalesPrice = (price, discount) => {
  return (price * (100 - discount)) / 100;
};

export const deepCloneArray = (arr) => {
  const cloneObject = (object) => {
    if (object === null) {
      return null;
    }

    const keysObj = Object.keys(object);
    const output = {};

    keysObj.forEach((key) => {
      if (Array.isArray(object[key])) {
        output[key] =
          object[key].length === 0 ? [] : deepCloneArray(object[key]);
        return;
      }

      if (typeof object[key] === "object") {
        output[key] = cloneObject(object[key]);
        return;
      }

      output[key] = object[key];
    });

    return output;
  };

  const output = [];

  arr.forEach((value, i) => {
    if (Array.isArray(value)) {
      output[i] = value.length === 0 ? [] : deepCloneArray(value);
      return;
    }

    if (typeof value === "object") {
      output[i] = cloneObject(value);
      return;
    }

    output[i] = value;
  });

  return output;
};
