import BaseController from '../../../../shared/BaseController';
import { HttpRequest, HttpResponse } from '../../../../shared/http';
import { GetClientUseCase } from './GetClientUseCase';
import { ClientMapper } from '../../mappers/ClientMapper';

export class GetClientController extends BaseController {
  private readonly useCase: GetClientUseCase;

  constructor(useCase: GetClientUseCase) {
    super();
    this.useCase = useCase;
  }

  async execute(request: HttpRequest): Promise<HttpResponse> {
    const response = await this.useCase.execute(request.queryParams);

    if (response.isLeft()) {
      return this.badRequest({ message: response.value.toString() });
    }

    const paginateResult = response.value;
    const resultsMaped = paginateResult.results.map((client) => ClientMapper.toDto(client));

    return this.ok({
      total: paginateResult.total,
      results: resultsMaped
    });
  }
}
