import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! please try again ;)';
  _message = '';

  _generetMarkup() {
    // console.log(this._data); _data is now array
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new resultsView();
