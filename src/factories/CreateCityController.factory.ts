import { MongoDBCityRepository } from '../core/cities/repository/implementations/mongodb-city-repository';
import { CreateCityController } from '../core/cities/useCases/createCity/CreateCityController';
import { CreateCityUseCase } from '../core/cities/useCases/createCity/CreateCityUseCase';

export const makeCreateCityController = (): CreateCityController => {
  const repository = new MongoDBCityRepository();
  const useCase = new CreateCityUseCase(repository);
  const controller = new CreateCityController(useCase);
  return controller;
};
