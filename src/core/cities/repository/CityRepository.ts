import { PaginateResult, PaginateOptions } from '../../../shared/Paginate';
import { UniqueId } from '../../../shared/UniqueId';
import { City } from '../domain/City.entity';
import { GetCityParams } from '../useCases/getCity/GetCityParams';
export interface ICityRepository {
  searchPaginate(params: GetCityParams, options?: PaginateOptions): Promise<PaginateResult<City>>;
  findById(id: UniqueId): Promise<City | null>;
  save(city: City): Promise<City>;
}
