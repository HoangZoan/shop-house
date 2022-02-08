export const convertPriceStringToNumber = (string) => {
  return Number(string.slice(0, -1).split(".").join(""));
};

export const convertNumberToPriceString = (
  number,
  autoGenerateThousandUnit = true
) => {
  if (number === 0) return "0";

  const beforeConvertNumberStr = String(Math.round(number));

  const numberStr = !autoGenerateThousandUnit
    ? beforeConvertNumberStr
    : [
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
  if (!discount) return price;

  return (price * (100 - discount)) / 100;
};

export const validateInput = (inputData, type) => {
  const data = inputData.trim();

  if (data.length === 0) {
    return { isValid: false, status: "empty" };
  }

  if (type === "phoneNumber") {
    return Number.isNaN(Number(inputData))
      ? {
          isValid: false,
          message: "Số điện thoại không hợp lệ. Vui lòng kiểm tra lại",
        }
      : { isValid: true };
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

export class Carousel {
  constructor(className, options) {
    this._options = options;
    this._carouselWrapperEl = document.querySelector("." + className);
    this._carouselContainerEl = this._carouselWrapperEl.parentElement;
    this._cardEls = [...this._carouselWrapperEl.children];
    this._imgEls = this._carouselWrapperEl.querySelectorAll("img");
    this._btnNext = this._carouselContainerEl.querySelector(
      "." + options.btnNext
    );
    this._btnPrev = this._carouselContainerEl.querySelector(
      "." + options.btnPrev
    );
    this._cardShown = options.cardShown;
    this._gap = options.gap;
    const _this = this;

    // Set slider type config
    let slidesHandler;
    switch (options.sliderType) {
      case "multi-slides":
        slidesHandler = this._multiSlidesHandler.bind(this);
        break;
      case "full-content":
        this._cardShown = 1;
        this._gap = 0;
        this._cardsLength = 4;
        slidesHandler = this._fullContentSlidesHandler.bind(this);
        break;
    }

    // Set components style
    this._setContainerStyle();
    this._setWrapperStyle();

    // Responsive
    if (Boolean(options.responsive)) {
      window.addEventListener("resize", () => {
        // Re-asign 'this' value according to responsive (resizing)
        _this._setResponsiveCSS(_this._options);
        _this._setWrapperStyle();
        slidesHandler(true);
      });

      // Re-asign 'this' value according to responsive (reload)
      this._setResponsiveCSS(_this._options);
      this._setWrapperStyle();
      slidesHandler();
    } else {
      // Set next/prev button handler (no-responsive)
      slidesHandler();
    }

    // Set hover effect
    if (Boolean(options.hoverEffect)) {
      this._setHoverEffect(options.hoverEffect);
    }

    // Hide next/prev button when there're not enough cards
    if (this._cardEls.length < this._cardShown) {
      if (!this._btnNext || !this._btnPrev) return;
      this._btnNext.style.display = "none";
      this._btnPrev.style.display = "none";
    }
  }

  _setHoverEffect(hoverEffect) {
    let initialStyle = {};

    this._cardEls.forEach((el) => {
      el.addEventListener("mouseover", () => {
        const props = Object.keys(hoverEffect);

        props.forEach((prop) => {
          initialStyle[prop] = el.style[prop];

          el.style[prop] =
            initialStyle[prop] === ""
              ? hoverEffect[prop]
              : `${initialStyle[prop]} ${hoverEffect[prop]}`;
        });
      });

      el.addEventListener("mouseout", () => {
        const props = Object.keys(initialStyle);

        props.forEach((prop) => (el.style[prop] = initialStyle[prop]));
      });
    });
  }

  _showImageByIndex() {}

  _fullContentSlidesHandler() {
    // console.log(this._imgEls);
  }

  _multiSlidesHandler(resize = false) {
    if (!this._btnNext || !this._btnPrev) return;

    if (resize) {
      this._cardEls.forEach((el) => {
        el.style.transform = "translateX(0)";
      });
      this._turn = 1;
      return;
    }

    const _this = this;
    if (!this._turn) this._turn = 1;

    // Hide prev button when showing the first card
    _this._btnPrev.style.opacity = "0";
    _this._btnPrev.style.visibility = "hidden";

    this._btnNext.addEventListener("click", () => {
      // Show prev button
      _this._btnPrev.style.opacity = "1";
      _this._btnPrev.style.visibility = "visible";

      // Hide next button when showing the last card
      if (_this._turn === _this._cardsLength - _this._cardShown) {
        _this._btnNext.style.opacity = "0";
        _this._btnNext.style.visibility = "hidden";
      }

      // Func
      _this._cardEls.forEach((el) => {
        el.style.transform = `translateX(calc((100% * ${_this._turn} + ${_this._gap} * ${_this._turn}) * -1))`;
      });
      _this._turn++;
    });

    this._btnPrev.addEventListener("click", () => {
      // Show next button
      _this._btnNext.style.opacity = "1";
      _this._btnNext.style.visibility = "visible";

      // Func
      _this._turn--;

      _this._cardEls.forEach((el) => {
        el.style.transform = `translateX(calc((100% * ${_this._turn - 1} + ${
          _this._gap
        } * ${_this._turn - 1}) * -1))`;
      });

      // Hide prev button when showing the first card
      if (_this._turn === 1) {
        _this._btnPrev.style.opacity = "0";
        _this._btnPrev.style.visibility = "hidden";
      }
    });
  }

  _setStyle(element, css) {
    const props = Object.keys(css);
    props.forEach((prop) => (element.style[prop] = css[prop]));
  }

  _setResponsiveCSS(options) {
    const currentRes = options.responsive.find(
      (option) => window.matchMedia(`(max-width:${option.breakPoint})`).matches
    );

    if (!currentRes) {
      this._cardShown = options.cardShown;
      this._gap = options.gap;
    } else {
      const props = Object.keys(currentRes);
      props.forEach((prop) => {
        if (prop === "breakPoint") return;
        this[`_${prop}`] = currentRes[prop];
      });
    }
  }

  _setContainerStyle() {
    this._setStyle(this._carouselContainerEl, {
      position: "relative",
      overflow: "hidden",
    });
  }

  _setWrapperStyle() {
    let columnWidth, columnCount;

    switch (this._options.sliderType) {
      case "multi-slides":
        columnCount = this._cardEls.length;
        columnWidth = `calc((100% - ${this._gap} * (${this._cardShown} - 1)) / ${this._cardShown})`;
        break;
      case "full-content":
        columnCount = this._imgEls.length;
        columnWidth = "100%";
        break;
    }

    this._setStyle(this._carouselWrapperEl, {
      display: "grid",
      gridTemplateColumns: `repeat(${columnCount}, ${columnWidth})`,
      columnGap: this._gap,
    });
  }
}
