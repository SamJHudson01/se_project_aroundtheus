export default class Section {
  constructor(
    { items, renderer }, 
    containerSelector) {
    this._cards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._cards.forEach((item) => {
      this._renderer(item);
    });
  }

  addInitialItem(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
