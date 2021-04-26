export class ClientNotFoundError extends Error {
  constructor() {
    super('client not found');
  }
}
