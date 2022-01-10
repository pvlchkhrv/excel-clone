export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // Уведомляем слушателей, если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) return false;
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  // подписываемся на уведомления, добавляем нвого слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] =
          this.listeners[event].filter(listener => listener !== fn);
    }
  }
}

// const emitter = new Emitter();
//
// emitter.subscribe('pavel', data => console.log('Sub:', data));
// emitter.emit('pavel', 42);
//
// setTimeout(() => {
//   emitter.emit('pavel', 'After 2 seconds')
// }, 2000);
