import Gems from "../components/gems";
import Jewel from "../components/jewel";
import { remove, render } from "../utils/render";

export default class FormPresenter {
  constructor(container) {
    this._container = container;

    this._currentValue = 'jewel';
    this._jewel = new Jewel();

    this._currentComponent = this._jewel;
  }

  init() {
    render(this._container, this._currentComponent);
  }

  rerender(value) {
    console.log(value)
    if (value === this._currentValue) {
      return;
    }
    this._currentValue = value;
    switch(value) {
      case 'jewel':
        remove(this._currentComponent);
        this._jewel = new Jewel();
        this._currentComponent = this._jewel;
        this.init();
        break;
      case 'gems':
        remove(this._currentComponent);
        const gems = new Gems();
        this._currentComponent = gems;
        this.init();
        break;
    }
  }
}
