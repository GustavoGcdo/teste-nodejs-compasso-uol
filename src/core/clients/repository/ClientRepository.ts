import { PaginateOptions, PaginateResult } from '../../../shared/Paginate';
import { UniqueId } from '../../../shared/UniqueId';
import { Client } from '../domain/Client.entity';
import { GetClientParams } from '../useCases/getClient/GetClientParams';

export interface IClientRepository {
  remove(id: UniqueId): Promise<void>;
  findById(id: UniqueId): Promise<Client>;
  searchPaginate(
    params: GetClientParams,
    paginateOptions: PaginateOptions
  ): Promise<PaginateResult<Client>>;

  create(newClient: Client): Promise<Client>;
}
