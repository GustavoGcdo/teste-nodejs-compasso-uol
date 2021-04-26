import BaseController from '../../../../shared/BaseController';
import { HttpRequest, HttpResponse } from '../../../../shared/http';
import { RemoveClientUseCase } from './RemoveClientUseCase';

export class RemoveClientController extends BaseController {
  private readonly useCase: RemoveClientUseCase;

  constructor(useCase: RemoveClientUseCase) {
    super();
    this.useCase = useCase;
  }

  async execute(request: HttpRequest): Promise<HttpResponse> {
    const response = await this.useCase.execute({ id: request.params.id });

    if (response.isLeft()) {
      return this.badRequest({ message: response.value.toString() });
    }

    return this.ok(null);
  }
}
