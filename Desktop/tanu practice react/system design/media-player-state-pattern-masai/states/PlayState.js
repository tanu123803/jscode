
class PlayState {
  enter(player) {
  
    console.log("▶️ Playing from", player.currentPosition, "seconds");
  }

  play(player) {
    console.log("▶️ Already playing.");
  }

  pause(player) {
    console.log("⏸ Pausing playback.");
    player.setState(player.pauseState);
  }

  stop(player) {
    console.log("⏹ Stopping playback.");
    
    player.currentPosition = 0;
    player.setState(player.stopState);
  }

  toString() { return "Play"; }
}

export default PlayState;
