/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '../domain/Client.entity';
import { City } from '../../cities/domain/City.entity';
import { UniqueId } from '../../../shared/UniqueId';
import { CityMapper } from '../../cities/mappers/CityMapper';

export abstract class ClientMapper {
  public static toDomain(raw: any): Client {
    const cityOrError = City.create(
      {
        name: raw.city.name,
        state: raw.city.state
      },
      new UniqueId(raw.city._id)
    );

    if (cityOrError.isLeft()) {
      throw new Error('invalid city');
    }

    const clientOrError = Client.create({
      birthdate: new Date(raw.birthdate),
      city: cityOrError.value,
      completeName: raw.completeName,
      gender: raw.gender
    }, new UniqueId(raw._id));

    if (clientOrError.isLeft()) {
      throw new Error('invalid client');
    }

    return clientOrError.value;
  }

  public static toPersist(client: Client): any {
    return {
      _id: client.id?.toString(),
      completeName: client.completeName,
      birthdate: client.birthdate,
      city: client.city.id,
      gender: client.gender
    };
  }

  public static toDto(client: Client): any {
    return {
      id: client.id ? client.id.toString() : undefined,
      completeName: client.completeName,
      age: client.age,
      city: CityMapper.toDto(client.city),
      birthdate: client.birthdate,
      gender: client.gender
    }
  }
}
