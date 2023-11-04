export default class Password {
  private value: string;

  constructor(password: string) {
    if (password.length < 6) throw new Error("Invalid length password");
    this.value = password;
  }
}
