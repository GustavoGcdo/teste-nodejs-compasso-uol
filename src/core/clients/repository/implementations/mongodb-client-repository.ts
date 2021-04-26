/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginateOptions, PaginateResult } from '../../../../shared/Paginate';
import { UniqueId } from '../../../../shared/UniqueId';
import { Client } from '../../domain/Client.entity';
import { ClientMapper } from '../../mappers/ClientMapper';
import clientSchema from '../../schemas/client.schema';
import { GetClientParams } from '../../useCases/getClient/GetClientParams';
import { IClientRepository } from '../ClientRepository';

export class MongoDBClientRepository implements IClientRepository {
  async update(client: Client): Promise<Client> {
    await clientSchema.updateOne({ _id: client.id.toString() }, ClientMapper.toPersist(client));
    return client;
  }

  async remove(id: UniqueId): Promise<void> {
    await clientSchema.remove({ _id: id.toString() });
  }

  async findById(id: UniqueId): Promise<Client | null> {
    const foundClient = await clientSchema.findOne({ _id: id.toString() }).populate('city');
    return foundClient ? ClientMapper.toDomain(foundClient) : null;
  }

  async searchPaginate(
    params: GetClientParams,
    options: PaginateOptions
  ): Promise<PaginateResult<Client>> {
    const query: any = {};

    if (params.name) {
      query.name = { $regex: params.name, $options: 'i' };
    }

    if (params.id) {
      query.state = params.id.toString();
    }

    const results = await clientSchema
      .find(query)
      .populate('city')
      .skip(options?.skip || 0)
      .limit(options?.limit || 10);

    const count = await clientSchema.countDocuments(query);

    const mappedClients = results.map((client) => ClientMapper.toDomain(client));

    return {
      results: mappedClients,
      total: count
    };
  }

  async create(newClient: Client): Promise<Client> {
    const created = await clientSchema.create(ClientMapper.toPersist(newClient));
    const createdClient = await this.findById(new UniqueId(created._id));
    return createdClient;
  }
}
