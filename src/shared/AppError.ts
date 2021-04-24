/* eslint-disable @typescript-eslint/no-explicit-any */
export namespace AppError {
  export class UnexpectedError extends Error {
    constructor(err: any) {
      super(err.toString());

      // TODO: LOG WITH SERVICE LOG ERROR
      // console.log('[AppError]: An unexpected error occurred');
      // console.error(err);
    }
  }
}
