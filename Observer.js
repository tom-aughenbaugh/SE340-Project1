// The Observer "interface"

class Observer {
  update(state) {
    throw new Error(`${this.constructor.name} must implement update(state)`);
  }
}

module.exports = Observer;
