import { AppError } from '../../../../shared/AppError';
import { Either, right } from '../../../../shared/Either';
import { UniqueId } from '../../../../shared/UniqueId';
import { UseCase } from '../../../../shared/UseCase';
import { CityNotFoundError } from '../../../cities/errors/CityNotFoundError';
import { ICityRepository } from '../../../cities/repository/CityRepository';
import { Client } from '../../domain/Client.entity';
import { Gender } from '../../domain/Gender.enum';
import { InvalidBirthdateError } from '../../errors/InvalidBirthdateError';
import { IClientRepository } from '../../repository/ClientRepository';
import { left } from './../../../../shared/Either';
import { InvalidCompleteNameError } from './../../errors/InvalidCompleteNameError';
import { CreateClientDto } from './CreateClientDto';

export type CreateClientResponse = Either<
  CityNotFoundError | InvalidCompleteNameError | InvalidBirthdateError | AppError.UnexpectedError,
  Client
>;

export class CreateClientUseCase implements UseCase<CreateClientDto, CreateClientResponse> {
  private readonly cityRepository: ICityRepository;
  private readonly clientRepository: IClientRepository;

  constructor(cityRepository: ICityRepository, clientRepository: IClientRepository) {
    this.cityRepository = cityRepository;
    this.clientRepository = clientRepository;
  }

  async execute(dto: CreateClientDto): Promise<CreateClientResponse> {
    try {
      const foundCity = await this.cityRepository.findById(new UniqueId(dto.cityId));

      if (!foundCity) {
        return left(new CityNotFoundError());
      }

      const clientOrError = Client.create({
        birthDate: new Date(dto.bithdate),
        city: foundCity,
        completeName: dto.completeName,
        gender: dto.gender as Gender
      });

      if (clientOrError.isLeft()) {
        return left(clientOrError.value);
      }

      const newClient: Client = clientOrError.value;
      const createdClient = await this.clientRepository.create(newClient);

      return right(createdClient);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
