import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPages = this._data.page;
    const numPages = Math.ceil(
      //   state.search.results.length / models.resultsPerPage
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 with other pages
    if (curPages === 1 && numPages > 1) {
      return `
          <button data-goto="${
            curPages + 1
          }" class="btn--inline pagination__btn--next">
          <span>Page${curPages + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>
      `;
    }
    // Last page
    if (curPages === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPages - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page${curPages - 1}</span>
          </button>
    `;
    }
    //Other pages
    if (curPages < numPages) {
      return `
        <button data-goto="${
          curPages - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page${curPages - 1}</span>
          </button>
        <button data-goto="${
          curPages + 1
        }" class="btn--inline data-goto pagination__btn--next">
        <span>Page${curPages + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>
    `;
    }
    // Page 1 && no other page
    return '';
  }
}

export default new PaginationView();
