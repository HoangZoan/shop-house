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
