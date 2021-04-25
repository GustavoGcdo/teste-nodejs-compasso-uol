import { UniqueId } from '../../../shared/UniqueId';
import { City } from '../domain/City.entity';
export interface ICityRepository {
  findById(id: UniqueId): Promise<City | null>;
  save(city: City): Promise<City>;
}
