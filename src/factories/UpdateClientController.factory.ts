import { MongoDBCityRepository } from '../core/cities/repository/implementations/mongodb-city-repository';
import { MongoDBClientRepository } from '../core/clients/repository/implementations/mongodb-client-repository';
import { UpdateClientController } from '../core/clients/useCases/updateClient/UpdateClientController';
import { UpdateClientUseCase } from '../core/clients/useCases/updateClient/UpdateClientUseCase';

export const makeUpdateClientController = (): UpdateClientController => {
  const clientRepository = new MongoDBClientRepository();
  const cityRepository = new MongoDBCityRepository();
  const useCase = new UpdateClientUseCase(clientRepository, cityRepository);
  const controller = new UpdateClientController(useCase);
  return controller;
};
