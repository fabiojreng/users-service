export default class Email {
  private email: string;

  constructor(email: string) {
    if (!email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
    this.email = email;
  }

  getEmail() {
    return this.email;
  }
}
