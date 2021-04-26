import BaseController from '../../../../shared/BaseController';
import { HttpRequest, HttpResponse } from '../../../../shared/http';
import { CreateCityUseCase } from './CreateCityUseCase';
import { CityMapper } from '../../mappers/CityMapper';

export class CreateCityController extends BaseController {
  private readonly useCase: CreateCityUseCase;

  constructor(useCase: CreateCityUseCase) {
    super();
    this.useCase = useCase;
  }

  async execute(request: HttpRequest): Promise<HttpResponse> {
    const response = await this.useCase.execute(request.body);

    if (response.isLeft()) {
      return this.badRequest({ message: response.value.toString() });
    }

    return this.ok(CityMapper.toDto(response.value));
  }
}
