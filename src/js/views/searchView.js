class searchView {
  _parentElement = document.querySelector('.search');
  _cleanQuery() {
    return (this._parentElement.querySelector('.search__field').value = '');
  }
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._cleanQuery();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
