export default class Name {
  private name: string;

  constructor(name: string) {
    if (!name.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{5,30}$/))
      throw new Error("Invalid name");
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
