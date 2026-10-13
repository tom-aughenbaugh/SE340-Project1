// The user enters scores and adds or removes observers while the program runs.
// GameScore (the subject) is never modified.
//  it only calls update(state) on whichever observers are attached at that moment.

const readline = require("node:readline");

const GameScore = require("./GameScore");
const ScoreboardDisplay = require("./ScoreboardDisplay");
const NotificationService = require("./NotificationService");
const StatsLogger = require("./StatsLogger");

// Each available observer.
const available = [
  { name: "Scoreboard Display", observer: new ScoreboardDisplay() },
  { name: "Notification Service", observer: new NotificationService() },
  { name: "Stats Logger", observer: new StatsLogger() },
];

const game = new GameScore(0, 0, 1);

// input helpers

const rl = readline.createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();

class InputEnded extends Error {}

async function ask(question) {
  process.stdout.write(question);
  const { value, done } = await lines.next();
  if (done) throw new InputEnded();
  return value.trim();
}

// Keep asking until the input passes the check.
async function askNumber(question, min, label) {
  while (true) {
    const text = await ask(question);
    if (/^\d+$/.test(text) && Number(text) >= min) return Number(text);
    console.log(`  Please enter a whole number ${label}.`);
  }
}

// helpers

const isAttached = (entry) => game.observers.includes(entry.observer);

function showAttached() {
  const names = available.filter(isAttached).map((e) => e.name);
  console.log(
    `Attached observers: ${names.length ? names.join(", ") : "none"}`,
  );
}

// menu actions

async function enterScore() {
  console.log("\n--- Enter a score ---");
  const home = await askNumber("Home score: ", 0, "0 or higher");
  const away = await askNumber("Away score: ", 0, "0 or higher");
  const period = await askNumber("Period: ", 1, "1 or higher");

  const count = game.observers.length;
  console.log(`\nScore set to ${home}-${away}, period ${period}.`);
  if (count === 0) {
    console.log("No observers are attached, so nothing reacted.");
    console.log("Choose 'Add an observer' to see a reaction next time.");
  } else {
    console.log(`Notifying ${count} observer${count === 1 ? "" : "s"}:`);
  }
  game.setScore(home, away, period);
}

async function addObserver() {
  console.log("\n--- Add an observer ---");
  const options = available.filter((e) => !isAttached(e));
  if (options.length === 0) {
    console.log("All observers are already attached.");
    return;
  }
  options.forEach((e, i) => console.log(`  ${i + 1}) ${e.name}`));
  console.log("  0) Cancel");
  const choice = await askNumber(
    "Which observer would you like to add? ",
    0,
    "from the list",
  );
  if (choice === 0 || choice > options.length) {
    console.log(
      choice === 0 ? "Cancelled." : "That is not one of the options.",
    );
    return;
  }
  game.attach(options[choice - 1].observer);
  console.log(`${options[choice - 1].name} added.`);
}

async function removeObserver() {
  console.log("\n--- Remove an observer ---");
  const options = available.filter(isAttached);
  if (options.length === 0) {
    console.log("There are no observers to remove.");
    return;
  }
  options.forEach((e, i) => console.log(`  ${i + 1}) ${e.name}`));
  console.log("  0) Cancel");
  const choice = await askNumber(
    "Which observer would you like to remove? ",
    0,
    "from the list",
  );
  if (choice === 0 || choice > options.length) {
    console.log(
      choice === 0 ? "Cancelled." : "That is not one of the options.",
    );
    return;
  }
  game.detach(options[choice - 1].observer);
  console.log(`${options[choice - 1].name} removed.`);
}

// main loop

async function main() {
  console.log("==============================");
  console.log("   Welcome to the Scoreboard");
  console.log("==============================");

  while (true) {
    console.log("");
    showAttached();
    console.log("\nMenu");
    console.log("  1) Enter a score");
    console.log("  2) Add an observer");
    console.log("  3) Remove an observer");
    console.log("  4) Quit");
    const choice = await ask("Choose an option: ");

    if (choice === "1") await enterScore();
    else if (choice === "2") await addObserver();
    else if (choice === "3") await removeObserver();
    else if (choice === "4") break;
    else console.log("Please choose 1, 2, 3 or 4.");
  }
  console.log("\nThanks for using the Scoreboard. Goodbye!");
}

main()
  .catch((err) => {
    if (!(err instanceof InputEnded)) throw err;
    console.log("\nInput ended. Goodbye!");
  })
  .finally(() => rl.close());
