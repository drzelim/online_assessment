import Abstract from "./abstarct";

const createFurCoatTemplate = () => {
  return (
    `<div class="assessment__dynamic-container">
      <div class="assessment__input-container assessment__input-container--dynamic">
        <input class="assessment__input assessment__input--dynamic" name="metal" type="text" placeholder="Вид меха">
      </div>
      <div class="assessment__input-container assessment__input-container--dynamic">
        <input class="assessment__input assessment__input--dynamic" name="sample" type="text" placeholder="Состояние изделия">
      </div>
    </div>`
  )
}

export default class FurCoat extends Abstract {

  getTemplate() {
    return createFurCoatTemplate();
  }
}
