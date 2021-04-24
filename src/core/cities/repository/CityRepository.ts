import { City } from '../domain/City.entity';
export interface ICityRepository {
  save(city: City): Promise<City>;
}
