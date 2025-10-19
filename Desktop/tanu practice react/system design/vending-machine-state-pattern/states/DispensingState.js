import IdleState from "./IdleState.js";

class DispensingState {
  insertCoin() {
    console.log("⚙️ Currently dispensing. Please wait...");
  }

  selectItem() {
    console.log("⚙️ Already dispensing selected item.");
  }

  dispenseComplete(machine) {
    console.log("✅ Dispensing complete. Returning to Idle state.");
    machine.setState(new IdleState());
  }

  toString() {
    return "Dispensing";
  }
}

export default DispensingState;
