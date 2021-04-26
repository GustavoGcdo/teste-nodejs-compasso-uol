import { PaginateOptions, PaginateResult } from '../../../shared/Paginate';
import { UniqueId } from '../../../shared/UniqueId';
import { Client } from '../domain/Client.entity';
import { GetClientParams } from '../useCases/getClient/GetClientParams';

export interface IClientRepository {
  update(client: Client): Promise<Client>;
  remove(id: UniqueId): Promise<void>;
  findById(id: UniqueId): Promise<Client>;
  searchPaginate(
    params: GetClientParams,
    options: PaginateOptions
  ): Promise<PaginateResult<Client>>;

  create(newClient: Client): Promise<Client>;
}
