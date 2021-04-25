import { AppError } from '../../../../shared/AppError';
import { Either, left, right } from '../../../../shared/Either';
import { getPaginateOptions, PaginateResult } from '../../../../shared/Paginate';
import { UseCase } from '../../../../shared/UseCase';
import { City } from '../../domain/City.entity';
import { ICityRepository } from '../../repository/CityRepository';
import { GetCityDto } from './GetCityDto';
import { GetCityParams } from './GetCityParams';

type GetCityResponse = Either<AppError.UnexpectedError, PaginateResult<City>>;

export class GetCityUseCase implements UseCase<GetCityDto, GetCityResponse> {
  private readonly cityRepository: ICityRepository;

  constructor(cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(dto: GetCityDto): Promise<GetCityResponse> {
    try {
      const { name, state, page, limit } = dto;

      const params: GetCityParams = { name, state };
      const paginateOptions = getPaginateOptions(page, limit);
      const paginateResult = await this.cityRepository.searchPaginate(params, paginateOptions);

      return right(paginateResult);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
