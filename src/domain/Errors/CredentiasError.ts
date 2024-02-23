export default class CredentiasError extends Error {
  constructor() {
    super('InvalidUser');
    this.name = 'InvalidUser';
    this.message = 'User or password invalid!';
  }
}
