import TrafficLight from "./TrafficLight.js";

console.log("=== 🚦 Traffic Light Demo (Manual + Auto Mode) ===");

// Manual mode first
const light = new TrafficLight({ autoRun: false });

setTimeout(() => {
  console.log("\n👉 Moving to next state manually...");
  light.next(); // Red → Green
}, 2000);

setTimeout(() => {
  console.log("\n👉 Moving to next state manually...");
  light.next(); 
}, 5000);

setTimeout(() => {
  console.log("\n👉 Moving to next state manually...");
  light.next(); 
}, 7000);

setTimeout(() => {
  console.log("\n✅ Final State:", light.currentState());
  console.log("\n=== Starting Auto-Run Demo ===\n");

  const autoLight = new TrafficLight({ autoRun: true });

  setTimeout(() => {
    autoLight.stopLoop();
    console.log("\n🛑 Auto-Run Stopped. Final State:", autoLight.currentState());
  }, 12000);
}, 9000);
