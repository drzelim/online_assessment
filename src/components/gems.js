import Abstract from "./abstarct";

const createGemsTemplate = () => {
  return (
    `<div class="assessment__dynamic-container assessment__dynamic--gems">
      <input class="assessment__input" name="carat" type="number" step="0.1" placeholder="Вес в каратах" id="assessment-gems-weight">
      <label class="assessment__carat">
        <input type="checkbox" name="documents">
        <span>Наличие документов</span>
      </label>
    </div>`
  );
};

export default class Gems extends Abstract {
  constructor() {
    super();

    this._setWeightValidityHandler = this._setWeightValidityHandler.bind(this);

    this._setWeightValidityHandler();
  }

  getTemplate() {
    return createGemsTemplate();
  }

  _setWeightValidityHandler() {
    const weight = this.getElement().querySelector('#assessment-gems-weight');
    weight.addEventListener('input', (evt) => {
      if (weight.validity.stepMismatch) {
        weight.value = weight.value.slice(0, weight.value.length - 1);
      }
    });
  }
};
