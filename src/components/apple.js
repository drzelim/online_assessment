import Abstract from "./abstarct";

const createAppleTemplate = () => {
  return (
    `<div>
      <input class="assessment__input assessment__input--dynamic" name="metal" type="text" placeholder="Модель">
      <input class="assessment__input assessment__input--dynamic" name="sample" type="number" step="1" placeholder="Объем памяти">
    </div>`
  )
}

export default class Apple extends Abstract {

  getTemplate() {
    return createAppleTemplate();
  }
}
