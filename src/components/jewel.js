import Abstract from "./abstarct";

const createJewelTemplate = () => {
  return (
    `<div class="assessment__dynamic-container">
      <input class="assessment__input assessment__input--dynamic" name="metal" type="text" placeholder="Металл">
      <input class="assessment__input assessment__input--dynamic" name="sample" type="number" step="1" placeholder="Проба">
      <input class="assessment__input assessment__input--dynamic" name="weight" type="number" step="0.1" placeholder="Вес">
    </div>`
  )
}

export default class Jewel extends Abstract {

  getTemplate() {
    return createJewelTemplate();
  }
}
