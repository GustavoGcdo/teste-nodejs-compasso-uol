import { RemoveClientUseCase } from '../core/clients/useCases/removeClient/RemoveClientUseCase';
import { MongoDBClientRepository } from '../core/clients/repository/implementations/mongodb-client-repository';
import { RemoveClientController } from '../core/clients/useCases/removeClient/RemoveClientController';

export const makeRemoveClientController = (): RemoveClientController => {
  const repository = new MongoDBClientRepository();
  const useCase = new RemoveClientUseCase(repository);
  const controller = new RemoveClientController(useCase);
  return controller;
};
