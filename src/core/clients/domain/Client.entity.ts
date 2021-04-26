import { Gender } from './Gender.enum';
import { City } from '../../cities/domain/City.entity';
import { UniqueId } from '../../../shared/UniqueId';
import { left, Either, right } from '../../../shared/Either';
import { InvalidCompleteNameError } from '../errors/InvalidCompleteNameError';
import { InvalidBirthdateError } from '../errors/InvalidBirthdateError';

export type ClientProps = {
  completeName: string;
  gender: Gender;
  birthdate: Date;
  city: City;
};
export class Client {
  private props: ClientProps;
  private _id: UniqueId;

  private constructor(props: ClientProps, id?: UniqueId) {
    this.props = props;
    if (id) this._id = id;
  }

  public static create(
    props: ClientProps,
    id?: UniqueId
  ): Either<InvalidCompleteNameError | InvalidBirthdateError, Client> {
    if (!props.completeName || props.completeName.trim().length === 0) {
      return left(new InvalidCompleteNameError());
    }

    if (
      !props.birthdate ||
      props.birthdate.toString() === 'Invalid Date' ||
      props.birthdate.getFullYear() >= new Date().getFullYear()
    ) {
      return left(new InvalidBirthdateError());
    }

    return right(new Client(props, id));
  }

  public get age(): number {
    const actualDateYear = new Date().getFullYear();
    const birthdateYear = this.props.birthdate.getFullYear();

    return actualDateYear - birthdateYear;
  }

  public get completeName(): string {
    return this.props.completeName;
  }

  public get birthdate(): Date {
    return this.props.birthdate;
  }

  public get city(): City {
    return this.props.city;
  }

  public get id(): UniqueId {
    return this._id;
  }
}
