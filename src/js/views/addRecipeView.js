import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'recie was successfully uploaded :)';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    // in eventHandeler 'this' will point to the element in which handler is attached
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //advance method for geting form data
      const data = Object.fromEntries(dataArr); //converting araay data to object data
      handler(data);
    });
  }
  _generetMarkup() {}
}
export default new addRecipeView();
