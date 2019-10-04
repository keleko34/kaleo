import Debug from './helpers/debug';

/* alerts: contain values from alerts, they are stored in the event a listener is added after the fact
 * eventbus: the main dictionary that holds all the event listeners
 */
const __alerts = {},
      __eventbus = {};

export default {
  install(vue) {
    
    /** 
     * Attaches a listener to the event bus, fires the function when the associated key is alerted
     *
     * @param {String} key the name of the event you want to listen for
     * @param {Function} func the method that will be ran
     * @return {Vue} the vue object that called it
     */
    vue.prototype.$listen = function listen(key, func) {
      /* TODO: REMOVE DEBUG CODE ON BUILD
       * attaches the events to the eventlist to be seen in the dev console
       */
      Debug.addToEventsList(`Eventbus.${key} `, func);
      
      if(!__eventbus[key]) __eventbus[key] = [];
      __eventbus[key].push(func.bind(this));
      
      /* Run the method immediately if an already alerted value exists */
      if(__alerts[key]) func(__alerts[key]);
      return this;
    };
    
    /** 
     * removes the associated listener
     *
     * @param {String} key the name of the event you want to remove from
     * @param {Function} func the method that will be removed
     * @return {Vue} the vue object that called it
     */
    vue.prototype.$unlisten = function unlisten(key, func) {
      /* TODO: REMOVE DEBUG CODE ON BUILD
       * removes the events from the eventlist so they are no longer visible in the dev console
       */
      Debug.removeFromEventsList(`Eventbus.${key}`, func);
      
      /* Loop through all the methods attached to this event and if the method matches, remove it */
      var event = __eventbus[key]
      if(event)
      {
        var len = event.length,
            x = 0;

        for(x;x<len;x++)
        {
          if(event[x] === func)
          {
            event.splice(x, 1);
            break;
          }
        }
      }
      return this;
    };
    
     /** 
     * Fires all listeners for the given event name
     *
     * @param {String} key the name of the event you want to fire
     * @param {Any} value passed
     * @return {Vue} the vue object that called it
     */
    vue.prototype.$alert = function alert(key, value) {
      var event = __eventbus[key];
      if(event)
      {
        var len = event.length,
            x = 0;
        for(x;x<len;x++)
        {
          event[x](value);
        }
      }
      
      /* store in alerts in case a listener is added after this alert */
      __alerts[key] = value;
      return this;
    };
    
    /** 
     * Fetch the current value with the given event name
     *
     * @param {String} key the name of the events value you want
     * @return {Any} the value
     */
    vue.prototype.$fetch = function fetch(key) {
      return __alerts[key];
    }
  }
}
