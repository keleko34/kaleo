class Debug {
  getCaller() {
    return new Error().stack.split('at').slice(3, 4)[0].match(/(\((.*?)\))/g)[0].replace(/[()]/g, '');
  }
  addToEventsList(key, func) {
    document.addEventListener(key, func, {
      capture: true,
      passive: true
    });
  }
  removeFromEventsList(key, func) {
    document.removeEventListener(key, func);
  }
}

export default new Debug();
