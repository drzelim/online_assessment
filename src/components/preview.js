import Abstract from "./abstarct";

const createPreviewTemplate = (src, id) => {
  return (
    `<div class="assessment__img-box" data-id=${id}>
      <img src="${src}" alt="" class="assessment__product-preview" width="80" height="80">
      <span data-id="${id}"></span>
    </div>`
  )
}

export default class Preview extends Abstract {
  constructor(src, id) {
    super();

    this._src = src;
    this.id = id;
  }

  getTemplate() {
    return createPreviewTemplate(this._src,  this.id);
  }
}
