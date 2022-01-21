class HeaderTopBarView {
  _searchIcon = document.querySelector(".tool-icon--search");

  addSearchClickHandler(handler) {
    this._searchIcon.addEventListener("click", () => {
      handler();
    });
  }
}

export default new HeaderTopBarView();

export const x = 0;
