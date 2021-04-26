import BaseController from '../../../../shared/BaseController';
import { HttpRequest, HttpResponse } from '../../../../shared/http';
import { CreateClientUseCase } from './CreateClientUseCase';
import { ClientMapper } from '../../mappers/ClientMapper';

export class CreateClientController extends BaseController {
    private readonly useCase: CreateClientUseCase;

    constructor(useCase: CreateClientUseCase) {
      super();
      this.useCase = useCase;
    }

    async execute(request: HttpRequest): Promise<HttpResponse> {
      const response = await this.useCase.execute(request.body);

      if (response.isLeft()) {
        return this.badRequest({ message: response.value.toString() });
      }

      return this.ok(ClientMapper.toDto(response.value));
    }
}
