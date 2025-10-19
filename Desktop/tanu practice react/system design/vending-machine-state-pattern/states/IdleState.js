import ProcessingState from "./ProcessingState.js";

class IdleState {
  insertCoin(machine) {
    console.log("💰 Coin inserted. Moving to Processing state.");
    machine.setState(new ProcessingState());
  }

  selectItem() {
    console.log("⚠️ Can't select item. Insert coin first (Idle state).");
  }

  dispenseComplete() {
    console.log("⚠️ Nothing to dispense (Idle state).");
  }

  toString() {
    return "Idle";
  }
}

export default IdleState;
