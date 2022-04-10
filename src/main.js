import FormPresenter from "./presenter/form-presenter";
import Api from "./api";

const URL = 'https://webhook.site/9f7eea7b-e9c7-40a7-8a9b-8ca8101d5e98';

// Ссылка для проверки запросов на сервер
// https://webhook.site/#!/9f7eea7b-e9c7-40a7-8a9b-8ca8101d5e98/beb1e22e-16cd-42e1-8064-10e7b7558cec/1

const assessment = document.querySelector('#assessment');
const select = assessment.querySelector('#assessment-select');
const inputPhotos = assessment.querySelector('#photos');
const housePreview = assessment.querySelector('#add-photo');
const assessmentForm = assessment.querySelector('#assessment-form');

const api = new Api(URL);

const formPresenter = new FormPresenter(assessment, inputPhotos, api, housePreview, assessmentForm);
formPresenter.init();

select.addEventListener('change', (evt) => {
  formPresenter.update(evt.target.value)
});
