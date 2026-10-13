// simulates sending a fan alert when a team scores.

const Observer = require("./Observer");

class NotificationService extends Observer {
  update(state, previous) {
    if (!previous) return;
    if (state.home > previous.home) {
      console.log(
        `[ALERT]    Home team scored! It's now ${state.home}-${state.away}.`,
      );
    } else if (state.away > previous.away) {
      console.log(
        `[ALERT]    Away team scored! It's now ${state.home}-${state.away}.`,
      );
    }
  }
}

module.exports = NotificationService;
