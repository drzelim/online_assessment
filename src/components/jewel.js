import Abstract from "./abstarct";

const createJewelTemplate = () => {
  return (
    `<div>
      <input class="assessment__input assessment__input--dynamic" name="metal" type="text" placeholder="Металл">
      <input class="assessment__input assessment__input--dynamic" name="sample" type="number" placeholder="Проба">
      <input class="assessment__input assessment__input--dynamic" name="weight" type="number" placeholder="Вес">
    </div>`
  )
}

export default class Jewel extends Abstract {

  getTemplate() {
    return createJewelTemplate();
  }
}
