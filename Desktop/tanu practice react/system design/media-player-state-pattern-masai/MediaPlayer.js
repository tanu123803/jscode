
import PlayState from "./states/PlayState.js";
import PauseState from "./states/PauseState.js";
import StopState from "./states/StopState.js";

class MediaPlayer {
  constructor({ autoDemo = false } = {}) {
    
    this.playState = new PlayState();
    this.pauseState = new PauseState();
    this.stopState = new StopState();

    
    this.state = this.stopState;

    
    this.currentTrack = "Unknown Track";
    this.currentPosition = 0; // seconds

    
    this.state.enter(this);

    if (autoDemo) this._demoLoop();
  }

  setState(newState) {
    this.state = newState;
    console.log(`🔁 State changed => ${this.state}`);
    if (typeof this.state.enter === "function") {
      this.state.enter(this);
    }
  }

  play()    { this.state.play(this); }
  pause()   { this.state.pause(this); }
  stop()    { this.state.stop(this); }

 
  tick(seconds = 1) { this.currentPosition += seconds; }

  currentState() { return this.state.toString(); }

  
  _demoLoop() {
    this._interval = setInterval(() => {
      if (this.state === this.playState) {
        this.tick(1);
        console.log(`⏱ Playing: position ${this.currentPosition}s`);
      }
    }, 1000);
  }

  stopDemo() {
    if (this._interval) clearInterval(this._interval);
  }
}

export default MediaPlayer;
