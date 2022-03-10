import { initializePageHeader } from "../model.js";

const formCardEl = document.querySelector(".form-card");
const formNotificationEl = document.querySelector(".form-notification");
const notificationTextEl = document.querySelector(".form-notification p");
const formTitleEl = document.querySelector(".form-title");
const confirmInputEl = document.getElementById("confirm");
const forgotPasswordEl = document.querySelector(".forgot-password-text");
const primaryBtnEl = document.querySelector(".primary-btn");
const subBtnEl = document.querySelector(".sub-btn");
const formControlEls = document.querySelectorAll(".form-control");
const userNameInputEl = document.getElementById("id");
const passwordInputEl = document.getElementById("password");
const confirmPasswordInputEl = document.getElementById("confirm");
const eyeIconEls = document.querySelectorAll(".icon-eye");
const loginSuccessEl = document.querySelector(".login-status-message");

let isLoginForm = true;

// Render UI
const renderFormUI = () => {
  formTitleEl.textContent = isLoginForm ? "Đăng nhập" : "Đăng ký";
  primaryBtnEl.textContent = isLoginForm ? "Đăng nhập" : "Xác nhận đăng ký";
  subBtnEl.textContent = !isLoginForm ? "Đăng nhập" : "Đăng ký";

  if (isLoginForm) {
    confirmInputEl.closest(".form-control").classList.add("hidden");
    forgotPasswordEl.classList.remove("hidden");
  } else {
    confirmInputEl.closest(".form-control").classList.remove("hidden");
    forgotPasswordEl.classList.add("hidden");
  }
};

const restoreUI = () => {
  [...formControlEls].forEach((el) => el.classList.remove("invalid"));
  [userNameInputEl, passwordInputEl, confirmPasswordInputEl].forEach(
    (el) => (el.value = "")
  );
  [...eyeIconEls].forEach((el) => el.setAttribute("name", "eye-off"));
  [passwordInputEl, confirmPasswordInputEl].forEach((el) =>
    el.setAttribute("type", "password")
  );
  loginSuccessEl.classList.add("hidden");
};

// Action buttons
const actionsBtnHandler = () => {
  subBtnEl.addEventListener("click", () => {
    // Set Form state
    isLoginForm = !isLoginForm;

    // Clear old UI state
    restoreUI();

    // Re-render UI
    renderFormUI();
  });
};

// Validation + Submit
const renderInputError = (inputEl, message, clearError = false) => {
  const controlEl = inputEl.closest(".form-control");
  const errorTextEl = controlEl.querySelector(".error-text");

  // Clear error state when use re-type inputs
  if (clearError) {
    controlEl.classList.remove("invalid");
    return;
  }

  controlEl.classList.add("invalid");
  errorTextEl.textContent = message;
};

const validateInputs = () => {
  const userNameValue = userNameInputEl.value;
  const passwordValue = passwordInputEl.value;
  const confirmPasswordValue = confirmPasswordInputEl.value;
  let inputsAreValid = true;

  if (userNameValue.trim().length === 0) {
    renderInputError(userNameInputEl, "Tên đăng nhập không được để trống");
    inputsAreValid = false;
  }

  if (passwordValue.trim().length < 6 || passwordValue.trim().length > 32) {
    renderInputError(
      passwordInputEl,
      "Mật khẩu phải có độ dài từ 6 đến 32 ký tự"
    );
    inputsAreValid = false;
  }

  if (!isLoginForm && confirmPasswordValue !== passwordValue) {
    renderInputError(
      confirmPasswordInputEl,
      "Confirm password must match the password"
    );
    inputsAreValid = false;
  }

  return inputsAreValid;
};

// Set event listener when user press key to type new input, then clear the prior error state
[userNameInputEl, passwordInputEl, confirmPasswordInputEl].forEach((el) =>
  el.addEventListener("keydown", (event) => {
    renderInputError(event.target, null, true);
  })
);

const renderNotiMessage = (loginSuccess) => {
  const loginSuccessText = loginSuccessEl.querySelector("span");
  const loginSuccessIcon = loginSuccessEl.querySelector("ion-icon");
  if (!isLoginForm) return;

  loginSuccessEl.classList.remove("hidden");

  loginSuccessText.textContent = loginSuccess
    ? "Đăng nhập thành công!"
    : "Đăng nhập không thành công";

  loginSuccessIcon.style.color = loginSuccess ? "green" : "red";

  if (loginSuccess) {
    loginSuccessIcon.setAttribute("name", "checkmark-circle");
  } else {
    loginSuccessIcon.setAttribute("name", "alert");
  }
};

const submitFormHandler = () => {
  formCardEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const formIsValid = validateInputs();

    renderNotiMessage(formIsValid);

    // Show register success
    if (formIsValid && !isLoginForm) {
      formCardEl.classList.add("hidden");
      formNotificationEl.classList.remove("hidden");
    }

    if (formIsValid) {
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    }
  });
};

// Show/Hide Password
formCardEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".icon-eye");
  if (!btn) return;

  const inputTargetEl = btn.parentElement.querySelector("input");

  if (btn.getAttribute("name") === "eye") {
    inputTargetEl.setAttribute("type", "password");
    btn.setAttribute("name", "eye-off");
  } else {
    inputTargetEl.setAttribute("type", "text");
    btn.setAttribute("name", "eye");
  }
});

// Initialize app
const init = () => {
  actionsBtnHandler();
  renderFormUI();
  submitFormHandler();
  initializePageHeader("nested-page");
};
init();
