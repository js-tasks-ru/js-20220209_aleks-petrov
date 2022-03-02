export default class SortableTable {

  element;
  subElements;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }

  _getTableHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.map((item) => this._getHeaderRow(item)).join('')}
      </div>
    `;
  }

  _getHeaderRow({id, title, sortable}) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="asc">
        <span>${title}</span>
      </div>
    `;
  }

  _getTableBody() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this._getTableRows(this.data).join('')}
      </div>
    `;
  }

  _getTableRows(data) {
    return data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this._getTableRow(item)}
        </a>
      `;
    });
  }

  _getTableRow(item) {
    return this.headerConfig.map(({id, template}) => {
      return template ? template(item[id]) : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  _getTable() {
    return `
      <div class="sortable-table">
        ${this._getTableHeader()}
        ${this._getTableBody()}
      </div>
    `;
  }

  sort(field, directions = 'asc') {
    const sortData = this._sortData(field, directions);
    this.data = this._sortData(field, directions);
    this.update();
  }

  _sortData(field, directions) {
    const direction = directions === 'asc' ? 1 : -1;
    const { sortType } = this.headerConfig.find(item => item.id === field);

    return [...this.data].sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      default:
        return 0;
      }
    });
  }

  render() {
    this.element = document.createElement('div');
    this.element.innerHTML = this._getTable();
    this.element = this.element.firstElementChild;

    this.subElements = this.element.querySelector('[data-element=body]');
  }

  update() {
    this.subElements.innerHTML = this._getTableBody();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}

