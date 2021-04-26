import { MongoDBClientRepository } from '../core/clients/repository/implementations/mongodb-client-repository';
import { GetClientUseCase } from '../core/clients/useCases/getClient/GetClientUseCase';
import { GetClientController } from './../core/clients/useCases/getClient/GetClientController';

export const makeGetClientController = (): GetClientController => {
  const repository = new MongoDBClientRepository();
  const useCase = new GetClientUseCase(repository);
  const controller = new GetClientController(useCase);
  return controller;
};
