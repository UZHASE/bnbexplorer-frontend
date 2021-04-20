class Log {
  constructor(component) {
    this.component = component;
  }

  log(msg, prefix = '') {
    // eslint-disable-next-line no-console
    console.log(this.component, ': ', prefix, msg);
  }
}

export default Log;
