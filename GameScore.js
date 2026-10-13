// This is the Subject. It holds the game state and the list of observers.
// It only ever calls observer.update(state). It never references a concrete
// observer class by name, which is what keeps it loosely coupled.

class GameScore {
  constructor(home = 0, away = 0, period = 1) {
    this.observers = [];
    this.state = { home, away, period };
  }

  attach(observer) {
    if (typeof observer.update !== "function") {
      throw new Error("Observer must implement update(state)");
    }
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  setScore(home, away, period) {
    const previous = this.state;
    this.state = { home, away, period };
    this.notifyObservers(previous);
  }

  notifyObservers(previous) {
    // Copy the list so an observer that detaches itself during update() does not break the loop.
    [...this.observers].forEach((o) => o.update(this.state, previous));
  }
}

module.exports = GameScore;
