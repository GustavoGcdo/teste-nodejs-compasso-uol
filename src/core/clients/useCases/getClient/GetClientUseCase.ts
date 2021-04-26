import { AppError } from '../../../../shared/AppError';
import { Either, left, right } from '../../../../shared/Either';
import { getPaginateOptions, PaginateResult } from '../../../../shared/Paginate';
import { UseCase } from '../../../../shared/UseCase';
import { GetClientDto } from './GetClientDto';
import { Client } from '../../domain/Client.entity';
import { IClientRepository } from '../../repository/ClientRepository';
import { GetClientParams } from './GetClientParams';
import { UniqueId } from '../../../../shared/UniqueId';

type GetClientResponse = Either<AppError.UnexpectedError, PaginateResult<Client>>;

export class GetClientUseCase implements UseCase<GetClientDto, GetClientResponse> {
  private readonly clientRespository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRespository = clientRepository;
  }

  async execute(dto: GetClientDto): Promise<GetClientResponse> {
    try {
      const { name, id, page, limit } = dto;

      const params: GetClientParams = { name, id: id ? new UniqueId(id) : undefined };
      const paginateOptions = getPaginateOptions(page, limit);
      const paginateResult = await this.clientRespository.searchPaginate(params, paginateOptions);

      return right(paginateResult);
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
