export default class ResetPasswordInvalid extends Error {
  constructor() {
    super("PasswordsDiffer");
    this.name = "PasswordsDiffer";
    this.message = "Passwords differ, please try again!";
  }
}
