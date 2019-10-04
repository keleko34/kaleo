class Debug {
  
  /**
  * Helps to get the name of the current scoped function
  *
  * @returns {String} The name of the function
  */
  getCaller() {
    return new Error().stack.split('at').slice(3, 4)[0].match(/(\((.*?)\))/g)[0].replace(/[()]/g, '');
  }
  
  /**
  * Adds the key and event to the dev console passive events list
  *
  * @returns {Undefined}
  */
  addToEventsList(key, func) {
    document.addEventListener(key, func, {
      capture: true,
      passive: true
    });
  }
  
  /**
  * Removes the key and event from the dev console passive events list
  *
  * @returns {Undefined}
  */
  removeFromEventsList(key, func) {
    document.removeEventListener(key, func);
  }
}

export default new Debug();
