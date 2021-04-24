export class InvalidCompleteNameError extends Error {
  constructor() {
    super('invalid client complete name');
  }
}
