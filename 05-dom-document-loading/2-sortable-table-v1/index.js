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

  sort(field, direction) {
    const directions = {
      'asc': 1,
      'desc': -1
    };
    const { sortType } = this.headerConfig.find(item => item.id === field);

    const sortData = [...this.data].sort((a, b) => {
      switch (sortType) {
      case 'number':
        return directions[direction] * (a[field] - b[field]);
      case 'string':
        return directions[direction] * a[field].localeCompare(b[field], ['ru', 'en']);
      default:
        return 0;
      }
    });

    this.update(sortData);
  }

  render() {
    this.element = document.createElement('div');
    this.element.innerHTML = this._getTable();
    this.element = this.element.firstElementChild;

    this.subElements = this._getSubElements();
  }

  _getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');
    for (const subElement of elements) {
      console.log('subElement', subElement);
      console.log('subElement.dataset', subElement.dataset);
      console.log('subElement.dataset.element', subElement.dataset.element);
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  update(newData = this.data) {
    this.subElements.body.innerHTML = this._getTableRows(newData).join('');
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}

