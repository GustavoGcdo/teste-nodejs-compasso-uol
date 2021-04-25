import { Client } from '../domain/Client.entity';

export interface IClientRepository {
    create(newClient: Client): Promise<Client>;
}
