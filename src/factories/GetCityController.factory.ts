import { GetCityUseCase } from './../core/cities/useCases/getCity/GetCityUseCase';
import { GetCityController } from '../core/cities/useCases/getCity/GetCityController';
import { MongoDBCityRepository } from '../core/cities/repository/implementations/mongodb-city-repository';

export const makeGetCityController = (): GetCityController => {
  const repository = new MongoDBCityRepository();
  const useCase = new GetCityUseCase(repository);
  const controller = new GetCityController(useCase);
  return controller;
};
