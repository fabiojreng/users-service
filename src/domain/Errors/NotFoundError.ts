export default class NotFoundError extends Error {
  constructor() {
    super('NotFound');
    this.name = 'NotFoundError';
    this.message = 'Not found';
  }
}
