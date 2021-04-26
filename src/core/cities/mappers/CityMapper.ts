/* eslint-disable @typescript-eslint/no-explicit-any */
import { City } from '../domain/City.entity';

export abstract class CityMapper {
  public static toDomain(raw: any): City {
    const cityOrErro = City.create(raw, raw._id);
    if (cityOrErro.isLeft()) {
      throw Error('Invalid city');
    }

    return cityOrErro.value;
  }

  public static toPersist(city: City): any {
    return {
      _id: city.id ? city.id.toString() : undefined,
      name: city.name,
      state: city.state
    };
  }

  public static toDto(city: City): any {
    return {
      id: city.id ? city.id.toString() : undefined,
      name: city.name,
      state: city.state
    };
  }
}
