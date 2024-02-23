export class AccessDeniedError extends Error {
  constructor() {
    super('Access denied');
    this.name = 'AccessDeniedError';
    this.message = 'You do not have permission for this action';
  }
}
