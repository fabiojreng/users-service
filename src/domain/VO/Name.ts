export default class Name {
  private value: string;

  constructor(name: string) {
    if (!name.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{5,30}$/))
      throw new Error("Invalid name");
    this.value = name;
  }

  getValue() {
    return this.value;
  }
}
