import icons from 'url:../../img/icons.svg';
import View from './view.js';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generetMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    return this._generetMarkupButton(curPage, numPages, icons);
  }

  _generetMarkupButton(curPage, numPages, icons) {
    // page 1 and their are other pages
    const nextButton = `
      <button data-goto="${
        curPage + 1
      }"  class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;

    //last page
    const prevButton = `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
    </button>`;

    if (curPage === 1 && numPages > 1) {
      return nextButton;
    } else if (curPage === numPages && numPages > 1) {
      return prevButton;
    } else if (curPage < numPages) {
      return `${prevButton}${nextButton}`;
    }

    // page 1 and their are no other pages
    return '';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}
export default new paginationView();
