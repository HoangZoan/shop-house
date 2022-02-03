import { initializePageHeader } from "../model.js";
import UserInfoView from "../views/userInfoView.js";

const init = () => {
  initializePageHeader("nested-page");
  UserInfoView.handleUpdateUserInfo();
};
init();
