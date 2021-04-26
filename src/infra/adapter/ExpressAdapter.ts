import BaseController from '../../shared/BaseController';
import { HttpRequest } from '../../shared/http';
import { Request, Response } from 'express';

export const adaptRoute = (controller: BaseController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      queryParams: request.query
    }

    const httpResponse = await controller.execute(httpRequest);
    return response.status(httpResponse.statusCode).send(httpResponse.body);
  }
}
