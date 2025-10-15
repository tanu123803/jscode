
class Character {
  getStats() {
    throw new Error("Method 'getStats()' must be implemented.");
  }
}



export class Warrior extends Character {
  constructor(name) {
    super();
    this.name = name;
    this.strength = 90;
    this.defense = 80;
  }

  getStats() {
    return `Warrior ${this.name} - Strength: ${this.strength}, Defense: ${this.defense}`;
  }
}

export class Archer extends Character {
  constructor(name) {
    super();
    this.name = name;
    this.agility = 80;
    this.strength = 40;
  }

  getStats() {
    return `Archer ${this.name} - Agility: ${this.agility}, Strength: ${this.strength}`;
  }
}

export class Mage extends Character {
  constructor(name) {
    super();
    this.name = name;
    this.intelligence = 90;
    this.mana = 100;
  }

  getStats() {
    return `Mage ${this.name} - Intelligence: ${this.intelligence}, Mana: ${this.mana}`;
  }
}



export class CharacterFactory {
  static createCharacter(type, name) {
    switch (type) {
      case "Warrior":
        return new Warrior(name);
      case "Archer":
        return new Archer(name);
      case "Mage":
        return new Mage(name);
      default:
        throw new Error("Invalid character type!");
    }
  }
}
