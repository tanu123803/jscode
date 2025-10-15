
class Product {
  getDescription() {
    throw new Error("Method 'getDescription()' must be implemented.");
  }
}


export class Laptop extends Product {
  constructor(name, price) {
    super();
    this.name = name;
    this.price = price;
  }

  getDescription() {
    return `Laptop: ${this.name}, Price: $${this.price}`;
  }
}

export class Mobile extends Product {
  constructor(name, price) {
    super();
    this.name = name;
    this.price = price;
  }

  getDescription() {
    return `Mobile: ${this.name}, Price: $${this.price}`;
  }
}

export class Tablet extends Product {
  constructor(name, price) {
    super();
    this.name = name;
    this.price = price;
  }

  getDescription() {
    return `Tablet: ${this.name}, Price: $${this.price}`;
  }
}


const productMap = {
  Laptop,
  Mobile,
  Tablet,
};


export class ProductFactory {
  static createProduct(type, name, price) {
    const ProductClass = productMap[type];
    if (!ProductClass) throw new Error("Unknown product type");
    return new ProductClass(name, price);
  }

 
  static registerProduct(type, ProductClass) {
    productMap[type] = ProductClass;
  }
}
