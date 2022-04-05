import { render } from "./utils/render";
import Jewel from "./components/jewel";
import FormPresenter from "./presenter/form-presenter";

const root = document.getElementById('root');
const select = document.getElementById('assessment-select');

const formPresenter = new FormPresenter(root);
formPresenter.init();


select.addEventListener('change', (evt) => {
  formPresenter.rerender(evt.target.value)
})


