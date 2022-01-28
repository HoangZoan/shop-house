export const convertPriceStringToNumber = (string) => {
  return Number(string.slice(0, -1).split(".").join(""));
};

export const convertNumberToPriceString = (number) => {
  if (number === 0) return "0";

  const beforeConvertNumberStr = String(Math.round(number));

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

export const calcSalesPrice = (price, discount) => {
  return (price * (100 - discount)) / 100;
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

export const deepCompareArrays = (arr1, arr2) => {
  function compareObjectValues(object1, object2) {
    const keysObj1 = Object.keys(object1);
    const keysObj2 = Object.keys(object2);

    if (!deepCompareArrays(keysObj1, keysObj2)) {
      return false;
    }

    for (const key of keysObj1) {
      if (Array.isArray(object1[key]) && Array.isArray(object2[key])) {
        return deepCompareArrays(object1[key], object2[key]);
      }

      if (object1[key] === null && object2[key] === null) {
        return true;
      }

      if (
        typeof object1[key] === "object" &&
        typeof object2[key] === "object"
      ) {
        return compareObjectValues(object1[key], object2[key]);
      }

      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      return deepCompareArrays(arr1[i], arr2[i]);
    }

    if (typeof arr1[i] == "object" && typeof arr2[i] == "object") {
      return compareObjectValues(arr1[i], arr2[i]);
    }

    if (String(arr1[i]) === "NaN" && String(arr2[i]) === "NaN") {
      return true;
    }

    if (!arr1.includes(arr2[i]) || !arr2.includes(arr1[i])) {
      return false;
    }
  }

  return true;
};

export const calcPromotionCodePrice = (netPrice, promotionCode) => {
  const [code, discount] = [promotionCode.slice(0, 4), promotionCode.slice(4)];
  const discountNumber = Number(discount);

  if (code !== "GIAM" || discountNumber > 100) return false;

  return (netPrice * discountNumber) / 100;
};
