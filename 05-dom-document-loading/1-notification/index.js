export default class NotificationMessage {
  static activatedNotification;

  _timerId;
  element;

  constructor(message = '', {
    duration = 0, //ms
    type = 'success' //success or error
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.durationInSeconds = duration / 1000;
    this.type = type;

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.durationInSeconds}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type[0].toUpperCase() + this.type.slice(1)}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.element = document.createElement('div');
    this.element.innerHTML = this.template;
    this.element = this.element.firstElementChild;
  }

  show(parent = document.body) {
    if (NotificationMessage.activatedNotification) {
      NotificationMessage.activatedNotification.remove();
    }

    parent.append(this.element);

    this._timerId = setTimeout(() => this.remove(), this.duration);

    NotificationMessage.activatedNotification = this;
  }

  remove() {
    clearTimeout(this._timerId);

    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.activatedNotification = null;
  }
}
