
class Bird {
  walk(): void {
    console.log("Walking...");
  }
}

interface Flyable {
  fly(): void;
}

class Sparrow extends Bird implements Flyable {
  fly(): void {
    console.log("Sparrow is flying...");
  }
}


class Ostrich extends Bird {
  run(): void {
    console.log("Ostrich is running fast...");
  }
}


const sparrow: Flyable = new Sparrow();
sparrow.fly(); // works fine

const ostrich = new Ostrich();
ostrich.run();  // works fine
