import { UseCase } from '../../../../shared/UseCase';
import { RemoveClientDto } from './RemoveClientDto';
import { Either, left, right } from '../../../../shared/Either';
import { AppError } from '../../../../shared/AppError';
import { ClientNotFoundError } from '../../errors/ClientNotFoundError';
import { UniqueId } from '../../../../shared/UniqueId';
import { IClientRepository } from '../../repository/ClientRepository';

type RemoveClientResponse = Either<ClientNotFoundError | AppError.UnexpectedError, null>;

export class RemoveClientUseCase implements UseCase<RemoveClientDto, RemoveClientResponse> {
  private readonly clientRespository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRespository = clientRepository;
  }

  async execute(dto: RemoveClientDto): Promise<RemoveClientResponse> {
    try {
      const foundClient = await this.clientRespository.findById(new UniqueId(dto.id));

      if (!foundClient) {
        return left(new ClientNotFoundError());
      }

      await this.clientRespository.remove(foundClient.id)

      return right(null);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
