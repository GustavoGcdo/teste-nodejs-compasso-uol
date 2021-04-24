export class InvalidBirthdateError extends Error {
  constructor() {
    super('invalid client birthdate');
  }
}
