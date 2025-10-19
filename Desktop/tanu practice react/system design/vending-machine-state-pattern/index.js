import VendingMachine from "./VendingMachine.js";

const vm = new VendingMachine();

vm.selectItem();       
vm.insertCoin();       
vm.insertCoin();       
vm.selectItem();      

setTimeout(() => {
  console.log(`🏁 Final State: ${vm.currentState()}`);
}, 2000);
