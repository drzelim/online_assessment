import Abstract from "./abstarct";

const createAppleTemplate = () => {
  return (
    `<div class="assessment__dynamic-container">
      <div class="assessment__input-container assessment__input-container--dynamic">
        <input class="assessment__input assessment__input--dynamic" name="metal" type="text" placeholder="Модель">
      </div>
      <div class="assessment__input-container assessment__input-container--dynamic">
        <input class="assessment__input assessment__input--dynamic" name="memory" type="number" step="1" placeholder="Объем памяти" id="assessment-apple">
      </div>
    </div>`
  )
}

export default class Apple extends Abstract {
  constructor() {
    super();

    this._setmemoryValidityHandler = this._setmemoryValidityHandler.bind(this);

    this._setmemoryValidityHandler();
  }

  getTemplate() {
    return createAppleTemplate();
  }

  _setmemoryValidityHandler() {
    const memory = this.getElement().querySelector('#assessment-apple');
    memory.addEventListener('input', (evt) => {
      console.log(memory.value);
      if (memory.validity.stepMismatch) {
        memory.value = memory.value.slice(0, memory.value.length - 2);
      }
    });
  }
}
