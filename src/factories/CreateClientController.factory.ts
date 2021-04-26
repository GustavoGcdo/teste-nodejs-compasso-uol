import { MongoDBCityRepository } from '../core/cities/repository/implementations/mongodb-city-repository';
import { CreateClientController } from '../core/clients/useCases/createClient/CreateClientController';
import { CreateClientUseCase } from '../core/clients/useCases/createClient/CreateClientUseCase';
import { MongoDBClientRepository } from '../core/clients/repository/implementations/mongodb-client-repository';

export const makeCreateClientController = (): CreateClientController => {
  const cityRepository = new MongoDBCityRepository();
  const clientRepository = new MongoDBClientRepository();
  const useCase = new CreateClientUseCase(cityRepository, clientRepository);
  const controller = new CreateClientController(useCase);
  return controller;
};
