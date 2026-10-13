# Observer Pattern: Live Sports Scoreboard

SE 340 Software Architecture, Project 1 (Design Patterns), Fall 2026.

A small Node.js console app that demonstrates the Observer pattern. A `GameScore`
subject holds the game state, and independent observers react whenever the score changes.

## Run it

Requires Node.js 18 or newer. No dependencies to install.

```
npm start
```

(or `node index.js`)

## How the program works

`npm start` opens a menu: enter a score, add an observer, remove an observer, or quit.
The program starts with no observers attached.

1. Enter a score with no observers and nothing reacts.
2. Add observers and enter a score: each attached observer reacts in its own way.
3. Remove an observer and enter another score: only the remaining observers react.

Observers can be added and removed while the program runs, and `GameScore` never changes.

## Files

| File | Role |
| --- | --- |
| `Observer.js` | The Observer interface: every subscriber must implement `update(state)` |
| `GameScore.js` | The Subject: holds score/period, `attach`, `detach`, `setScore`, `notifyObservers` |
| `ScoreboardDisplay.js` | Observer that prints the current score and period |
| `NotificationService.js` | Observer that simulates a fan alert when a team scores |
| `StatsLogger.js` | Observer that records a timestamped history of changes |
| `index.js` | The interactive menu that ties everything together |

`GameScore` only ever calls `observer.update(state)`. It never names a concrete observer,
so new observers can be added without editing it.
