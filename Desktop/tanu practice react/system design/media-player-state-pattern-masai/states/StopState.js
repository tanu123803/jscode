// states/StopState.js
class StopState {
  enter(player) {
    console.log("⏹ Player stopped. Position reset to", player.currentPosition, "seconds");
  }

  play(player) {
    console.log("▶️ Starting playback from beginning.");
    player.currentPosition = 0;
    player.setState(player.playState);
  }

  pause(player) {
    console.log("⚠️ Can't pause. Player is stopped.");
  }

  stop(player) {
    console.log("⏹ Already stopped.");
  }

  toString() { return "Stop"; }
}

export default StopState;
