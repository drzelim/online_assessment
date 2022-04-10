import FormPresenter from "./presenter/form-presenter";
import Api from "./api";

const URL = 'kokookok.ko';

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
