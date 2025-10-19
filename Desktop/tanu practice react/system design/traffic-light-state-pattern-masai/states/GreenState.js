class GreenState {
  enter(light) {
    console.log("🟢 GREEN — Vehicles can move.");
    light.setDuration(4000); // 4 seconds before switching
  }

  next(light) {
    light.setState(light.yellowState); // Move to Yellow
  }

  toString() {
    return "Green";
  }
}

export default GreenState;
