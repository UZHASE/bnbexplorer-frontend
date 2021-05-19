/**
 * Provides an interface to the console.log function
 * @param   {string}  component The component's name
 */
class Log {
  constructor(component) {
    this.component = component;
  }
  /**
   * Produce logging output
   * @param   {string}  msg Data to be logged
   * @param   {string}  prefix Optional, for additional descriptive information
   */
  log(msg, prefix = '') {
    // eslint-disable-next-line no-console
    console.log(this.component, ': ', prefix, msg);
  }
}

export default Log;
