export class InvalidCityNameError extends Error {
  constructor() {
    super('invalid city name');
  }
}
