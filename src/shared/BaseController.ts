/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest, HttpResponse } from './http';

export default abstract class BaseController {
  abstract execute(request: HttpRequest): Promise<HttpResponse>;

  protected badRequest(body: any): HttpResponse {
    return {
      body,
      statusCode: 400
    };
  }

  protected ok(body: any): HttpResponse {
    return {
      body,
      statusCode: 200
    };
  }
}
