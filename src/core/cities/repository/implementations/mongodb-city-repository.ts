/* eslint-disable @typescript-eslint/no-explicit-any */
import { City } from '../../domain/City.entity';
import { ICityRepository } from '../CityRepository';
import { GetCityParams } from '../../useCases/getCity/GetCityParams';
import { PaginateOptions, PaginateResult } from '../../../../shared/Paginate';
import { UniqueId } from '../../../../shared/UniqueId';
import citySchema from '../../schemas/city.schema';
import { CityMapper } from '../../mappers/CityMapper';
import mongoose from 'mongoose';

export class MongoDBCityRepository implements ICityRepository {
  async searchPaginate(
    params: GetCityParams,
    options?: PaginateOptions
  ): Promise<PaginateResult<City>> {
    const query: any = {};

    if (params.name) {
      query.name = { $regex: params.name, $options: 'i' };
    }

    if (params.state) {
      query.state = { $regex: params.state, $options: 'i' };
    }

    const results = await citySchema
      .find(query)
      .skip(options?.skip || 0)
      .limit(options?.limit || 10);

    const count = await citySchema.countDocuments(query);

    const mappedCities = results.map((city) => CityMapper.toDomain(city));

    return {
      results: mappedCities,
      total: count
    };
  }

  async findById(id: UniqueId): Promise<City | null> {
    const isValid = mongoose.Types.ObjectId.isValid(id.toString());
    if (!isValid) {
      return null;
    }
    const foundCity = await citySchema.findOne({ _id: id.toString() });
    return foundCity ? CityMapper.toDomain(foundCity) : null;
  }

  async save(city: City): Promise<City> {
    const created = await citySchema.create(CityMapper.toPersist(city));
    return CityMapper.toDomain(created);
  }
}
