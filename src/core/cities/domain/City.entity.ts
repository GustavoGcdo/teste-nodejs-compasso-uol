import { UniqueId } from '../../../shared/UniqueId';
import { left, Either, right } from '../../../shared/Either';
import { InvalidCityNameError } from '../errors/InvalidCityNameError';
import { InvalidStateNameError } from '../errors/InvalidStateNameError';

export type CityProps = {
  name: string;
  state: string;
};
export class City {
  private _id: UniqueId;
  private props: CityProps;

  private constructor(props: CityProps, id?: UniqueId) {
    this.props = props;
    if (id) this._id = id;
  }

  public static create(
    props: CityProps,
    id?: UniqueId
  ): Either<InvalidCityNameError | InvalidStateNameError, City> {
    if (!props.name || props.name.trim().length === 0) {
      return left(new InvalidCityNameError());
    }

    if (!props.state || props.state.trim().length === 0) {
      return left(new InvalidStateNameError());
    }

    return right(new City(props, id));
  }

  public get id(): UniqueId {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get state(): string {
    return this.props.state;
  }
}
