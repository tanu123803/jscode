
class Book {
  getCategory() {
    throw new Error("Method 'getCategory()' must be implemented.");
  }
}

export class RegularBook extends Book {
  constructor(title, price) {
    super();
    this.title = title;
    this.price = price;
  }

  getCategory() {
    return `Regular Book`;
  }
}


export class PremiumBook extends Book {
  constructor(title, price) {
    super();
    this.title = title;
    this.price = price;
  }

  getCategory() {
    return `Premium Book`;
  }
}


export class BookFactory {
  static createBook(title, price) {
    if (price > 1000) {
      return new PremiumBook(title, price);
    } else {
      return new RegularBook(title, price);
    }
  }
}
