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
    this._imgEls = [
      ...this._carouselWrapperEl.querySelectorAll(".slider-item"),
    ];
    this._btnNext = this._carouselContainerEl.querySelector(
      "." + options.btnNext
    );
    this._btnPrev = this._carouselContainerEl.querySelector(
      "." + options.btnPrev
    );
    this._btnImagesContainer = this._carouselContainerEl.querySelector(
      "." + options.btnImageContainer
    );
    this._btnsImage = this._btnImagesContainer && [
      ...this._btnImagesContainer.children,
    ];

    this._cardShown = options.cardShown;
    this._gap = options.gap;
    this._slideSpeed = options.slideSpeed;
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

    // Set auto-play

    /* Full-content */
    if (options.sliderType === "full-content" && options.autoPlay) {
      let imageNumber = 1;
      let intervalActive = [];

      const createInterval = () => {
        const interval = setInterval(() => {
          if (imageNumber > this._imgEls.length) {
            imageNumber = 1;
          }

          this._imageOrder = imageNumber;
          this._showImageByIndex(imageNumber);

          if (this._btnNext && this._btnPrev) {
            // Hide prev button when showing the first image
            imageNumber === 1
              ? this._showPrevBtn(false)
              : this._showPrevBtn(true);

            // Hide next button when showing the last image
            imageNumber === this._imgEls.length
              ? this._showNextBtn(false)
              : this._showNextBtn(true);
          }

          if (this._btnImagesContainer) {
            this._activateMiniImagesByImageOrder(imageNumber);
          }

          imageNumber++;
        }, options.autoPlay);

        if (intervalActive.length === 0) {
          intervalActive.push(interval);
        }
      };
      createInterval();

      if (this._btnNext && this._btnPrev) {
        [this._btnNext, this._btnPrev].forEach((btnEl) => {
          btnEl.addEventListener("click", () => {
            if (intervalActive.length !== 0) {
              clearInterval(intervalActive[0]);
              createInterval();
            }
          });
        });
      }
    }
  }

  _showNextBtn(show) {
    if (show) {
      this._btnNext.style.opacity = "1";
      this._btnNext.style.visibility = "visible";
    } else {
      this._btnNext.style.opacity = "0";
      this._btnNext.style.visibility = "hidden";
    }
  }

  _showPrevBtn(show) {
    if (show) {
      this._btnPrev.style.opacity = "1";
      this._btnPrev.style.visibility = "visible";
    } else {
      this._btnPrev.style.opacity = "0";
      this._btnPrev.style.visibility = "hidden";
    }
  }

  // Functions for 'full-content' type
  _fullContentSlidesHandler() {
    if (!this._imageOrder) this._imageOrder = 1;

    // Handle arrow buttons
    if (this._btnNext && this._btnPrev) {
      this._handleFullContentSlidesArrowButtons();
    }

    // Handle mini-images
    if (this._btnsImage) {
      this._handleFullContentImageButtons();
    }
  }

  _activateMiniImagesByImageOrder(imageOrder) {
    this._btnsImage.forEach((el, index) => {
      if (index + 1 === imageOrder) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  _showImageByIndex(imageOrder) {
    this._imgEls.forEach(
      (el) =>
        (el.style.transform = `translateX(calc((${
          imageOrder - 1
        } * 100%) * -1)`)
    );
  }

  _handleFullContentImageButtons() {
    const _this = this;

    this._btnsImage.forEach((el, index) => {
      el.addEventListener("click", () => {
        // Show large image and activate mini image by index
        _this._showImageByIndex(index + 1);
        _this._activateMiniImagesByImageOrder(index + 1);
        _this._imageOrder = index + 1;

        // Show/hide nex/prev button (if they exist)
        if (!this._btnNext || !this._btnPrev) return;

        [_this._btnPrev, _this._btnNext].forEach((el) => {
          el.style.opacity = "1";
          el.style.visibility = "visible";
        });

        // Hide next button when showing the last image
        if (index === this._btnsImage.length - 1) {
          _this._showNextBtn(false);
        }

        // Hide prev button when showing the first image
        if (index === 0) {
          _this._showPrevBtn(false);
        }
      });
    });
  }

  _handleFullContentSlidesArrowButtons() {
    const _this = this;
    // Hide prev button when showing the first image
    if (this._imageOrder === 1) {
      this._showPrevBtn(false);
    }

    this._btnNext.addEventListener("click", () => {
      // Show prev button
      _this._showPrevBtn(true);

      // Hide next button when showing the last image
      if (_this._imageOrder === _this._imgEls.length - 1) {
        _this._showNextBtn(false);
      }

      // Functionality
      _this._imageOrder++;
      _this._showImageByIndex(_this._imageOrder);
      _this._btnsImage &&
        _this._activateMiniImagesByImageOrder(_this._imageOrder);
    });

    this._btnPrev.addEventListener("click", () => {
      // Show next button
      _this._showNextBtn(true);

      // Functionality
      _this._imageOrder--;
      _this._showImageByIndex(_this._imageOrder);
      _this._btnsImage &&
        _this._activateMiniImagesByImageOrder(_this._imageOrder);

      // Hide prev button when showing the first image
      if (_this._imageOrder === 1) {
        _this._showPrevBtn(false);
      }
    });
  }

  // Functions for 'multi-slides' type
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
    this._showPrevBtn(false);

    this._btnNext.addEventListener("click", () => {
      // Show prev button
      _this._showPrevBtn(true);

      // Hide next button when showing the last card
      if (_this._turn === _this._cardEls.length - _this._cardShown) {
        _this._showNextBtn(false);
      }

      // Functionality
      _this._cardEls.forEach((el) => {
        el.style.transform = `translateX(calc((100% * ${_this._turn} + ${_this._gap} * ${_this._turn}) * -1))`;
      });
      _this._turn++;
    });

    this._btnPrev.addEventListener("click", () => {
      // Show next button
      _this._showNextBtn(true);

      // Functionality
      _this._turn--;
      _this._cardEls.forEach((el) => {
        el.style.transform = `translateX(calc((100% * ${_this._turn - 1} + ${
          _this._gap
        } * ${_this._turn - 1}) * -1))`;
      });

      // Hide prev button when showing the first card
      if (_this._turn === 1) {
        _this._showPrevBtn(false);
      }
    });
  }

  // Set components style

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
}

export function convertViToEn(str, toUpperCase = false) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str;
}
