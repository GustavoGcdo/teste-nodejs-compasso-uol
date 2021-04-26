import { GetCityUseCase } from './GetCityUseCase';
import BaseController from '../../../../shared/BaseController';
import { HttpRequest, HttpResponse } from '../../../../shared/http';
import { CityMapper } from '../../mappers/CityMapper';

export class GetCityController extends BaseController {
  private readonly useCase: GetCityUseCase;

  constructor(useCase: GetCityUseCase) {
    super();
    this.useCase = useCase;
  }

  async execute(request: HttpRequest): Promise<HttpResponse> {
    const response = await this.useCase.execute(request.queryParams);

    if (response.isLeft()) {
      return this.badRequest({ message: response.value.toString() });
    }

    const paginateResult = response.value;
    const mappedResults = paginateResult.results.map(city => CityMapper.toDto(city));

    return this.ok({
      total: paginateResult.total,
      results: mappedResults
    })
  }
}
