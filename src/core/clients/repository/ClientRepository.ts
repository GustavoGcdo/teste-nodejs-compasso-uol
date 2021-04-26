import { PaginateOptions, PaginateResult } from '../../../shared/Paginate';
import { Client } from '../domain/Client.entity';
import { GetClientParams } from '../useCases/getClient/GetClientParams';

export interface IClientRepository {
  searchPaginate(
    params: GetClientParams,
    paginateOptions: PaginateOptions
  ): Promise<PaginateResult<Client>>;

  create(newClient: Client): Promise<Client>;
}
