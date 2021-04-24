import { AppError } from '../../../../shared/AppError';
import { Either, left, right } from '../../../../shared/Either';
import { UseCase } from '../../../../shared/UseCase';
import { City } from '../../domain/City.entity';
import { InvalidCityNameError } from '../../errors/InvalidCityNameError';
import { InvalidStateNameError } from '../../errors/InvalidStateNameError';
import { ICityRepository } from '../../repository/CityRepository';
import { CreateCityDto } from './CreateCityDto';

export type CreateCityResponse = Either<
  InvalidCityNameError | InvalidStateNameError | AppError.UnexpectedError,
  City
>;

export class CreateCityUseCase implements UseCase<CreateCityDto, CreateCityResponse> {
  private readonly cityRepository: ICityRepository;

  constructor(cityRepository: ICityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(dto: CreateCityDto): Promise<CreateCityResponse> {
    try {
      const cityOrError = City.create(dto);

      if (cityOrError.isLeft()) {
        return left(cityOrError.value);
      }

      const createdCity = await this.cityRepository.save(cityOrError.value);

      return right(createdCity);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
