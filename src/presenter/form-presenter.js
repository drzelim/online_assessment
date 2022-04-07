import { nanoid } from "nanoid";
import Apple from "../components/apple";
import FurCoat from "../components/fur-coat";
import Gems from "../components/gems";
import Jewel from "../components/jewel";
import Preview from "../components/preview";
import { ProductType } from "../utils/const";
import { remove, render } from "../utils/render";

const FILE_TYPES = ['.png', '.jpg', '.jpeg', '.gif'];
const MAX_IMAGE = 9;

export default class FormPresenter {
  constructor(assessment, inputPhotos, api, housePreview, form) {
    this._assessment = assessment;
    this._inputPhotos = inputPhotos;
    this._api = api;
    this._housePreview = housePreview;
    this._form = form;

    this._container = null;
    this._emailField = null;
    this._phoneField = null;

    this._currentValue = ProductType.JEWEL;

    this._currentComponent = new Jewel();

    this._files = [];
    this._previews = [];
  }

  init() {
    this._container = this._assessment.querySelector('#assessment-root');
    this._emailField = this._assessment.querySelector('.assessment__user-email');
    this._phoneField = this._assessment.querySelector('.assessment__user-tel');

    this._render();
    this._addPreviewHandler();
    this._fetchData();
    this._deletePhotoHandler();
  }

  _render() {
    render(this._container, this._currentComponent);
  }

  update(value) {
    if (value === this._currentValue) {
      return;
    }

    this._currentValue = value;

    switch(value) {
      case ProductType.JEWEL:
        remove(this._currentComponent);
        this._currentComponent = new Jewel();
        this._render();
        break;
      case ProductType.GEMS:
        remove(this._currentComponent);
        this._currentComponent = new Gems();
        this._render();
        break;
      case ProductType.FUR_COAT:
        remove(this._currentComponent);
        this._currentComponent = new FurCoat();
        this._render();
        break;
      case ProductType.APPLE:
        remove(this._currentComponent);
        this._currentComponent = new Apple();
        this._render();
        break;
      default:
        remove(this._currentComponent);
        break;
    }
  }

  _addPreviewHandler() {
    this._inputPhotos.addEventListener('change', () => {
      const files = this._inputPhotos.files;
      this._files = this._files.concat(Object.values(files));

      if (this._files.length > MAX_IMAGE) {
        alert(`Выберите не больше ${MAX_IMAGE} изображений`);
        this._files = this._files.slice(0, MAX_IMAGE);
      }

      this._clearPhotoContainer();

      this._files.forEach( (file) => {
        const fileName = file.name.toLowerCase();
        const matches = FILE_TYPES.some((it) => {
          return fileName.endsWith(it)
        });

        if (matches) {
          const id = nanoid(10);
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            const preview = new Preview(reader.result, id);
            this._previews.push(preview);
            file.id = id;

            render(this._housePreview, preview)
          });

          reader.readAsDataURL(file);
        }
      });
    });
  }

  _deletePhotoHandler() {
    const photoContainer = this._assessment.querySelector('.assessment__photo-container');
    photoContainer.addEventListener('click', (evt) => {
      if (evt.target.tagName === 'SPAN') {
        this._previews.forEach((item) => {
          if (item.id === evt.target.dataset.id) {
            remove(item);
            this._inputPhotos.value = '';
            this._files = this._files.filter((file) => file.id !== evt.target.dataset.id);
          }
        });
      }
    });
  }

  _clearPhotoContainer() {
    this._previews.forEach((item) => remove(item));
  }

  _fetchData() {
    this._form.addEventListener('submit', async (evt) => {
      evt.preventDefault();

      console.log(this._emailField.validity)
      console.log(this._phoneField.validity)

      if (this._emailField.value === '' && this._phoneField.value === '') {
        alert('Должно быть заполнено хотя бы одно поле: email или Телефон');
        return;
      }

      const formData = new FormData(this._form);
      formData.delete('photos');
      this._files.forEach((item, index) => {
        formData.append('photo_' + index + 1, item);
      });

      const response = await this._api.init(formData);
      if (response.ok) {
        this._clearPhotoContainer();
        this._inputPhotos.value = '';
        this._files = [];
        this._form.reset();
      }
    });
  }
}
