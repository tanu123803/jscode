class YellowState {
  enter(light) {
    console.log("🟡 YELLOW — Vehicles should slow down.");
    light.setDuration(2000); // 2 seconds before switching
  }

  next(light) {
    light.setState(light.redState); // Move to Red
  }

  toString() {
    return "Yellow";
  }
}

export default YellowState;
