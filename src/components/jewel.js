import { MetalType } from "../utils/const";
import Smart from "./smart";

const createSample = (metal) => {
  switch(metal) {
    case MetalType.GOLD:
      return (
        `<select class="assessment__input assessment__input--dynamic" name="sample" id="assessment-sample">
          <option value="">Выберите пробу</option>
          <option value="56">56</option>
          <option value="84">84</option>
          <option value="333">333</option>
          <option value="375">375</option>
          <option value="500">500</option>
          <option value="583">583</option>
          <option value="585">585</option>
          <option value="750">750</option>
          <option value="850">850</option>
          <option value="875">875</option>
          <option value="900">900</option>
          <option value="916">916</option>
          <option value="958">958</option>
          <option value="999">999</option>
        </select>`
      );
    case MetalType.SILVER:
      return (
        `<select class="assessment__input assessment__input--dynamic" name="sample" id="assessment-sample">
          <option value="">Выберите пробу</option>
          <option value="800">800</option>
          <option value="830">830</option>
          <option value="875">875</option>
          <option value="900">900</option>
          <option value="916">916</option>
          <option value="925">925</option>
          <option value="960">960</option>
          <option value="999">999</option>
        </select>`
      );
    case MetalType.PLATINUM:
      return (
        `<select class="assessment__input assessment__input--dynamic" name="sample" id="assessment-sample">
          <option value="">Выберите пробу</option>
          <option value="585">585</option>
          <option value="850">850</option>
          <option value="900">900</option>
          <option value="950">950</option>
        </select>`
      );
    case MetalType.PALLADIUM:
      return (
        `<select class="assessment__input assessment__input--dynamic" name="sample" id="assessment-sample">
          <option value="">Выберите пробу</option>
          <option value="500">500</option>
          <option value="850">850</option>
        </select>`
      );
  }
};

const createJewelTemplate = (metalType) => {
  return (
    `<div class="assessment__dynamic-container">
      <select class="assessment__input assessment__input--dynamic" name="metal" id="assessment-metal">
        <option value="gold" ${metalType === MetalType.GOLD && 'selected'}>Золото</option>
        <option value="silver" ${metalType === MetalType.SILVER && 'selected'}>Серебро</option>
        <option value="platinum" ${metalType === MetalType.PLATINUM && 'selected'}>Платина</option>
        <option value="palladium" ${metalType === MetalType.PALLADIUM && 'selected'}>Палладий</option>
      </select>
      ${createSample(metalType)}
      <input class="assessment__input assessment__input--dynamic" name="weight" type="number" step="0.1" placeholder="Вес" id="assessment-weight">
    </div>`
  );
};

export default class Jewel extends Smart {
  constructor() {
    super();

    this._currentMetalType = MetalType.GOLD;

    this._changeMetalTypeHandler = this._changeMetalTypeHandler.bind(this);
    this._setWeightValidatyHandler = this._setWeightValidatyHandler.bind(this);

    this._setWeightValidatyHandler();
  }

  getTemplate() {
    return createJewelTemplate(this._currentMetalType);
  }

  _changeMetalTypeHandler(evt) {
    this._callbacks.metalTypeHandler(evt);
  }

  setChangeMetalTypeHandler(callbacks) {
    this._callbacks.metalTypeHandler = callbacks;
    this.getElement().querySelector('#assessment-metal').addEventListener('change', this._changeMetalTypeHandler)
  }

  restoreHandlers() {
    this.setChangeMetalTypeHandler(this._callbacks.metalTypeHandler);
  }

  updateMetalType(metalType) {
    this._currentMetalType = metalType;
    this.updateElement();
  }

  _setWeightValidatyHandler() {
    const weight = this.getElement().querySelector('#assessment-weight');
    weight.addEventListener('input', (evt) => {
      if (weight.validity.stepMismatch) {
        weight.value = weight.value.slice(0, weight.value.length - 1);
      }
    });
  }
}

{/* <input class="assessment__input assessment__input--dynamic" name="metal" type="text" placeholder="Металл"></input> */}
{/* <input class="assessment__input assessment__input--dynamic" name="sample" type="number" step="1" placeholder="Проба"> */}
