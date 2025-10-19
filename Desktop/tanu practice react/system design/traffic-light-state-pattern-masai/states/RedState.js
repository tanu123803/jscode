class RedState {
  enter(light) {
    console.log("🔴 RED — Vehicles must stop.");
    light.setDuration(3000); // 3 seconds before switching
  }

  next(light) {
    light.setState(light.greenState); // Move to Green
  }

  toString() {
    return "Red";
  }
}

export default RedState;
