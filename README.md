# Observer Pattern Scoreboard

SE 340 Project 1 (Design Patterns). A small Node.js program that shows the Observer pattern using a sports scoreboard.

## Run it

You need Node.js installed. There is nothing else to install.

```
node index.js
```

## How it works

The program shows a menu where you can enter a score, add an observer, remove an observer, or quit. It starts with no observers, so the first score you enter does nothing. Add some observers, enter another score, and each one reacts in its own way. You can add and remove them while the program is running.

## Files

- `GameScore.js`: the subject. It holds the score and the list of observers.
- `Observer.js`: the base class every observer extends.
- `ScoreboardDisplay.js`: prints the score and period.
- `NotificationService.js`: prints an alert when a team scores.
- `StatsLogger.js`: keeps a history of every score and prints it.
- `index.js`: the menu.
