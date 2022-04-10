import { nanoid } from "nanoid";
import Apple from "../components/apple";
import FurCoat from "../components/fur-coat";
import Gems from "../components/gems";
import Jewel from "../components/jewel";
import Preview from "../components/preview";
import { ProductType } from "../utils/const";
import { remove, render } from "../utils/render";

const FILE_TYPES = ['.png', '.jpg', '.jpeg', '.gif', 'heic', 'heif'];
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
    this._invalidMessage = null;
    this._buttonSubmit = null;

    this._currentValue = ProductType.JEWEL;
    this._currentComponent =  new Jewel();

    this._files = [];
    this._previews = [];

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeMetalType = this._changeMetalType.bind(this);

    this._currentComponent.setChangeMetalTypeHandler(this._changeMetalType);
  }

  init() {
    this._container = this._assessment.querySelector('#assessment-root');
    this._emailField = this._assessment.querySelector('.assessment__user-email');
    this._phoneField = this._assessment.querySelector('.assessment__user-tel');
    this._buttonSubmit = this._assessment.querySelector('.assessment__form-submit');

    this._render();
    this._addPreviewHandler();
    this._fetchData();
    this._deletePhotoHandler();
    this._addPhoneFieldMask();
  }

  _addPhoneFieldMask() {
    const maskOptions = {
      mask: '+{7}(000) 000-00-00'
    };
    IMask(this._phoneField, maskOptions);
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
        this._renderCurrentComponent(Jewel);
        this._currentComponent.setChangeMetalTypeHandler(this._changeMetalType);
        break;
      case ProductType.GEMS:
        this._renderCurrentComponent(Gems);
        break;
      case ProductType.FUR_COAT:
        this._renderCurrentComponent(FurCoat);
        break;
      case ProductType.APPLE:
        this._renderCurrentComponent(Apple);
        break;
      default:
        remove(this._currentComponent);
        break;
    }
  }

  _renderCurrentComponent(CurrentComponent) {
    remove(this._currentComponent);
    this._currentComponent = new CurrentComponent();
    this._render();
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
    this._form.addEventListener('submit', this._formSubmitHandler);
  }

  _validatyCheck() {
    let valid = true
    if (this._emailField.value === '' && this._phoneField.value === '') {
      this._invalidMessage = this._assessment.querySelector('.assessment__invalid-message');
      this._invalidMessage.classList.add('show');
      this._emailField.classList.add('assessment__input--invalid');
      this._phoneField.classList.add('assessment__input--invalid');
      return valid = false;
    }

    if (this._invalidMessage && this._invalidMessage.classList.contains('show')) {
      this._invalidMessage.classList.remove('show');
      this._emailField.classList.remove('assessment__input--invalid');
      this._phoneField.classList.remove('assessment__input--invalid');
      valid = true;
    }
    return valid;
  }

  async _formSubmitHandler(evt) {
    evt.preventDefault();
    const valid = this._validatyCheck();

    if (!valid) {
      return;
    }

    const formData = new FormData(this._form);
    formData.delete('photos');

    // const blobArray = []
    // this._files.forEach((item) => blobArray.push(new Blob([item], {type: 'image/jpg'})))
    // blobArray.forEach((i, index) => formData.append('photos[]', i));

    this._files.forEach((item) => {
      formData.append('photos[]', item);
    });

    this._buttonSubmit.setAttribute('disabled', true);
    this._buttonSubmit.style.opacity = 0.3;

    const response = await this._api.init(formData);

    this._assessment.classList.contains('modal-error') && this._assessment.classList.remove('modal-error');

    try {
        if (response.status >= 200 && response.status < 300) {
        alert('Данные успешно загружены');
        this._formReset();
        return response;
      }

      alert(`Ошибка ${response.status}`);
      this._assessment.classList.add('modal-error');

    } catch {
      alert('Прозошла ошибка, попробуйте позже');
      this._assessment.classList.add('modal-error');

    } finally {
      this._buttonSubmit.removeAttribute('disabled');
      this._buttonSubmit.style.opacity = 1;
    }
  }

  _changeMetalType(evt) {
    this._currentComponent.updateMetalType(evt.target.value);
  }

  _formReset() {
    this._clearPhotoContainer();
    this._inputPhotos.value = '';
    this._files = [];
    this._form.reset();
    remove(this._currentComponent);
    this._currentComponent = new Jewel();
    this._currentValue = ProductType.JEWEL;
    this._render();
  }
}
