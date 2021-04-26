import BaseController from '../../../../shared/BaseController';
import { HttpRequest, HttpResponse } from '../../../../shared/http';
import { UpdateClientUseCase } from './UpdateClientUseCase';

export class UpdateClientController extends BaseController {
  private readonly useCase: UpdateClientUseCase;

  constructor(useCase: UpdateClientUseCase) {
    super();
    this.useCase = useCase;
  }

  async execute(request: HttpRequest): Promise<HttpResponse> {
    const response = await this.useCase.execute({ ...request.body, clientId: request.params.id });

    if (response.isLeft()) {
      return this.badRequest({ message: response.value.toString() });
    }

    return this.ok(null);
  }
}
