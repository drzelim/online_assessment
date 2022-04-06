import { createElement } from '../utils/render.js';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only cocrete one.');
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error('Abstarct nethod not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
