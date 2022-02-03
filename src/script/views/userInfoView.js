import { View } from "./view.js";

class UserInfoView extends View {
  handleUpdateUserInfo() {
    const updateForm = document.querySelector(".user-update");
    const cancelBtnEl = updateForm.querySelector(".btn--sub");

    cancelBtnEl.addEventListener("click", () => {
      updateForm.classList.remove("update");
    });

    updateForm.addEventListener("submit", (event) => {
      const inputEls = updateForm.querySelectorAll("input");
      const formValueEls = document.querySelectorAll(
        ".user-update__form-control__value"
      );
      const formValues = [...formValueEls].map((el) => el.innerText);
      const inputValues = [...inputEls].map((el) => el.value);
      const isUpdating = updateForm.classList.contains("update");

      event.preventDefault();

      if (!isUpdating) {
        inputEls.forEach((el, index) => {
          if (el.type === "date") {
            const convertedDateValue = formValues[index]
              .split("/")
              .reverse()
              .join("-");

            el.value = convertedDateValue;
            return;
          }
          el.value = formValues[index];
        });
      } else {
        formValueEls.forEach((el, index) => {
          if ([...inputEls][index].type === "date") {
            const convertedDateValue = formValues[index]
              .split("-")
              .reverse()
              .join("/");

            el.innerText = convertedDateValue;
            return;
          }
          el.innerText = inputValues[index];
        });
      }

      updateForm.classList.toggle("update");
    });
  }
}

export default new UserInfoView();
