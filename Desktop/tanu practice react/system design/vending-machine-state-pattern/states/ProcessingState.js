import DispensingState from "./DispensingState.js";

class ProcessingState {
  insertCoin() {
    console.log("⚠️ Coin already inserted. Processing current transaction.");
  }

  selectItem(machine) {
    console.log("🛒 Item selected. Moving to Dispensing state.");
    machine.setState(new DispensingState());
    machine.dispense(); 
  }

  dispenseComplete() {
    console.log("⚠️ Can't complete dispensing yet — item not dispensing (Processing).");
  }

  toString() {
    return "Processing";
  }
}

export default ProcessingState;
