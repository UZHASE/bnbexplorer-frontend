class Log {
  constructor(component) {
    this.component = component;
  }

  log(msg, prefix='') {
    console.log(this.component, ': ', prefix, msg);
  }
}

export default Log;
