// keeps a history of all game states.

const Observer = require("./Observer");

class StatsLogger extends Observer {
  constructor() {
    super();
    this.history = [];
  }

  update(state) {
    const entry = { time: new Date().toISOString(), ...state };
    this.history.push(entry);
    console.log("[LOGGER] Full History:");
    this.history.forEach((e, i) => {
      console.log(
        `Recorded entry #${i + 1}: ${e.home}-${e.away}, period ${e.period}`,
      );
    });
  }
}

module.exports = StatsLogger;
