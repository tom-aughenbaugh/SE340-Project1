// shows the current score and period.

const Observer = require("./Observer");

class ScoreboardDisplay extends Observer {
  update(state) {
    console.log(
      `[DISPLAY]  HOME ${state.home} - AWAY ${state.away}  (Period ${state.period})`,
    );
  }
}

module.exports = ScoreboardDisplay;
