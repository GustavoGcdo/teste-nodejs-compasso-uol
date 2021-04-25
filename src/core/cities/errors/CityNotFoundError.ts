export class CityNotFoundError extends Error {
  constructor() {
    super('city not found');
  }
}
