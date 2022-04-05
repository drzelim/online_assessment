import Abstract from "./abstarct";

const createGemsTemplate = () => {
  return (
    `<div>
      <input class="assessment__input" name="carat" type="number" placeholder="Вес в каратах">
      <label class="assessment__carat">
        <input type="checkbox">
        <span>Наличие документов</span>
      </label>
    </div>`
  );
};

export default class Gems extends Abstract {

  getTemplate() {
    return createGemsTemplate();
  }
};
