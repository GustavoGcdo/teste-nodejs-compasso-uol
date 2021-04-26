import { AppError } from '../../../../shared/AppError';
import { Either, right } from '../../../../shared/Either';
import { UniqueId } from '../../../../shared/UniqueId';
import { UseCase } from '../../../../shared/UseCase';
import { CityNotFoundError } from '../../../cities/errors/CityNotFoundError';
import { ICityRepository } from '../../../cities/repository/CityRepository';
import { Client } from '../../domain/Client.entity';
import { Gender } from '../../domain/Gender.enum';
import { ClientNotFoundError } from '../../errors/ClientNotFoundError';
import { InvalidBirthdateError } from '../../errors/InvalidBirthdateError';
import { IClientRepository } from '../../repository/ClientRepository';
import { left } from './../../../../shared/Either';
import { InvalidCompleteNameError } from './../../errors/InvalidCompleteNameError';
import { UpdateClientDto } from './UpdateClientDto';

type UpdateClientResponse = Either<
  InvalidBirthdateError | InvalidCompleteNameError | CityNotFoundError | AppError.UnexpectedError,
  Client
>;

export class UpdateClientUseCase implements UseCase<UpdateClientDto, UpdateClientResponse> {
  private readonly clientRespository: IClientRepository;
  private readonly cityRepository: ICityRepository;

  constructor(clientRepository: IClientRepository, cityRepository: ICityRepository) {
    this.clientRespository = clientRepository;
    this.cityRepository = cityRepository;
  }

  async execute(dto: UpdateClientDto): Promise<UpdateClientResponse> {
    try {
      const foundClient = await this.clientRespository.findById(new UniqueId(dto.clientId));

      if (!foundClient) {
        return left(new ClientNotFoundError());
      }

      const updatedClientOrError = await this.updateProperties(foundClient, dto);

      if (updatedClientOrError.isLeft()) {
        return left(updatedClientOrError.value);
      }

      const updatedClient = await this.clientRespository.update(updatedClientOrError.value);
      return right(updatedClient);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }

  private async updateProperties(
    client: Client,
    dto: UpdateClientDto
  ): Promise<Either<InvalidBirthdateError | InvalidCompleteNameError | CityNotFoundError, Client>> {
    const { birthdate, completeName, cityId, gender } = dto;

    if (birthdate) {
      const birthdateOrError = client.setBirthdate(new Date(birthdate));
      if (birthdateOrError.isLeft()) {
        return left(birthdateOrError.value);
      }
    }

    if (completeName) {
      const completeOrError = client.setCompleteName(completeName);
      if (completeOrError.isLeft()) {
        return left(completeOrError.value);
      }
    }

    if (cityId) {
      const cityFound = await this.cityRepository.findById(new UniqueId(cityId));
      if (!cityFound) {
        return left(new CityNotFoundError());
      }
      client.setCity(cityFound);
    }

    if (gender) {
      client.setGender(gender as Gender);
    }

    return right(client);
  }
}
