import IdleState from "./states/IdleState.js";

class VendingMachine {
  constructor() {
    this.state = new IdleState();
    console.log(`🚀 Machine started in state: ${this.state}`);
  }

  setState(newState) {
    this.state = newState;
    console.log(`🔄 State changed => ${this.state}`);
  }

  insertCoin() {
    this.state.insertCoin(this);
  }

  selectItem() {
    this.state.selectItem(this);
  }

  dispense() {
    console.log("🧃 Dispensing item... (simulated 1 second)");
    setTimeout(() => this.dispenseComplete(), 1000);
  }

  dispenseComplete() {
    this.state.dispenseComplete(this);
  }

  currentState() {
    return this.state.toString();
  }
}

export default VendingMachine;
