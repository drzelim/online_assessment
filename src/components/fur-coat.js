import Abstract from "./abstarct";

const createFurCoatTemplate = () => {
  return (
    `<div>
      <input class="assessment__input assessment__input--dynamic" name="metal" type="text" placeholder="Вид меха">
      <input class="assessment__input assessment__input--dynamic" name="sample" type="text" placeholder="Состояние изделия">
    </div>`
  )
}

export default class FurCoat extends Abstract {

  getTemplate() {
    return createFurCoatTemplate();
  }
}
