import RedState from "./states/RedState.js";
import GreenState from "./states/GreenState.js";
import YellowState from "./states/YellowState.js";

class TrafficLight {
  constructor({ autoRun = false } = {}) {
    // Create states
    this.redState = new RedState();
    this.greenState = new GreenState();
    this.yellowState = new YellowState();

    // Initial state
    this.state = this.redState;
    this.duration = 0;
    this._timer = null;

    console.log(`🚦 Traffic Light started in state: ${this.state}`);
    this.state.enter(this);

    if (autoRun) {
      this.startLoop();
    }
  }

  setState(newState) {
    this.state = newState;
    console.log(`🔄 State changed => ${this.state}`);
    this.state.enter(this);
  }

  setDuration(ms) {
    this.duration = Number(ms) || 0;
  }

  next() {
    this.state.next(this);
  }

  startLoop() {
    if (this._timer) clearTimeout(this._timer);

    const scheduleNext = () => {
      this._timer = setTimeout(() => {
        this.next();
        scheduleNext();
      }, this.duration);
    };

    scheduleNext();
  }

  stopLoop() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  currentState() {
    return this.state.toString();
  }
}

export default TrafficLight;
