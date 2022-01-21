export class View {
  _data;

  renderItems(data) {
    if (!Array.isArray(data) || data.length === 0) return;
    this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderSingleItem(data) {
    if (!data) return;
    this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  addRenderWhenLoadedHanlder(handler) {
    window.addEventListener("load", handler);
  }
}
