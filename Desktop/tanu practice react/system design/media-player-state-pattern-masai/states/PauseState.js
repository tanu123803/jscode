// states/PauseState.js
class PauseState {
  enter(player) {
    console.log("⏸ Player paused at", player.currentPosition, "seconds");
  }

  play(player) {
    console.log("▶️ Resuming playback.");
    player.setState(player.playState);
  }

  pause(player) {
    console.log("⏸ Already paused.");
  }

  stop(player) {
    console.log("⏹ Stopping from paused state.");
    player.currentPosition = 0;
    player.setState(player.stopState);
  }

  toString() { return "Pause"; }
}

export default PauseState;
